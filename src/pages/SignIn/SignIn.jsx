import styles from './signIn.module.css'
import writeUserToDb from '../../firebase/writeUserToDb';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , googleProvider} from "../../firebase/firebase";
import { useNavigate   , useLocation} from "react-router-dom";
import { useEffect , useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from "firebase/firestore"
import { getDoc , doc , setDoc } from "firebase/firestore";
import { db  } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignInPage() {


  const navigateTo = useNavigate()
  const location = useLocation();

  const [user , loading] = useAuthState(auth);
  const [errorCode , setErrorCode] = useState(null)
  const [createForm , setCreateForm] = useState({email:'',password:''})

  const googleSignIn = ()=>{

        signInWithPopup(auth , googleProvider).then((userCredential) => {
          const user = userCredential.user
          async function updateUser(){
            await writeUserToDb(user)
            console.log('Signed in Succesfull')
            navigateTo('/profile' , {state:{error:'Signed in Succesfull'}})
          }
          updateUser()
           }).catch((error) => {
            console.log(error)
           })
  }



  const emailAndPasswordSignUp = (e)=>{

    e.preventDefault()
    const formEmail = createForm?.email
    const formPassword = createForm?.password

    console.log('Email: ',formEmail ,'Password: ',formPassword)

    if(true){
    signInWithEmailAndPassword(auth, formEmail, formPassword)
    .then((userCredential) => {
      const user = userCredential.user
      async function updateUser(){
        await writeUserToDb(user)
        console.log('Signed in Succesfull')
        navigateTo('/profile' , {state:{error:'Signed in Succesfull'}})
      }
      updateUser()
    })
    .catch((error) => {
     
      if(error.code){

        if(error.code = 'auth/invalid-login-credentials')setErrorCode('Invalid email or password')
      }
      // ..
    });
    }
  }





  useEffect(()=>{
    if(user !== null && loading === false){
      console.log('User has already signed in and is redirected to account page')
      navigateTo("/profile" , {state:{error:'Already Signed In'}})
    } 
  },[loading])



    return ( 

   <div className={styles.signInPage}>
   <h1>SIGN IN</h1>
   <h2>Sign in with Email and Passwrod</h2>

    <form className={styles.signInForm} onSubmit={emailAndPasswordSignUp}>
      <p className={styles.errorCode}>{errorCode}</p>
      <label>
        Email
        <input type="email"  required onChange={(e)=>{setCreateForm(current=>{return{...current , email:e.target.value}})}}/>
      </label>

      <label>
        Password
        <input type="password" minLength="8" required onChange={(e)=>{setCreateForm(current=>{return{...current , password:e.target.value}})}}/>
      </label>

      <input className={styles.submitBtn} type="submit" value="Sing in"/>
    </form>



      <h3>Or...</h3>

   <button className={styles.signInWith} onClick={googleSignIn}> Sign in with Google</button>

       <p>Don't have an account ? <button onClick={()=>navigateTo('/signup')}>Sign Up</button></p>
     </div>

     );
}

export default SignInPage;