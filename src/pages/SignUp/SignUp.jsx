
import styles from './signUp.module.css'
import { FacebookAuthProvider } from 'firebase/auth';
import { auth , googleProvider , facebookProvider } from "../../firebase/firebase"
import { signInWithPopup , getAdditionalUserInfo , createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import writeUserToDb from '../../firebase/writeUserToDb';
function SignUpPage() {
  
  const navigateTo = useNavigate()
  const [errorCode , setErrorCode] = useState(null)
  const [createForm , setCreateForm] = useState({name:'',email:'',password:''})
  const [user , loading] = useAuthState(auth);
  



    const emailAndPasswordSignUp = (e)=>{

      e.preventDefault()
      const formName = createForm?.name
      const formEmail = createForm?.email
      const formPassword = createForm?.password

      console.log('Name: ',formName,'Email: ',formEmail ,'Password: ',formPassword)

      if(true){
      createUserWithEmailAndPassword(auth, formEmail, formPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(userCredential.user , {
          displayName:formName
        }).then(()=>{

        async function updateUser(){
          await writeUserToDb(user)
          console.log('Signed up Succesfull')
          navigateTo('/profile' , {state:{error:'Signed up Succesfull'}})
        }



         updateUser()
          
        }).catch((error)=>{console.log(error)})
      

       

      })
      .catch((error) => {
        console.log(error.code)
        if(error.code){

          if(error.code = 'auth/email-already-in-use')setErrorCode('Email already in use!')
        }
      });
    }




    }

    const googleSignUp = ()=>{
      signInWithPopup(auth , googleProvider).then((userCredential) => {
        const user = userCredential.user

        async function updateUser(){
          await writeUserToDb(user)
          console.log('Signed up Succesfull')
          navigateTo('/profile' , {state:{error:'Signed up Succesfull'}})
        }
        updateUser()
        
         }).catch((error) => {
          console.log(error)
         })
    }

    const facebookSignUp = ()=>{
      signInWithPopup(auth, facebookProvider)
      .then((userCredential) => {
        console.log('loading')
        const user = userCredential.user

        async function updateUser(){
          await writeUserToDb(user)
          console.log('Signed up Succesfull')
          navigateTo('/profile' , {state:{error:'Signed up Succesfull'}})
        }
        updateUser()

        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
       console.log(error)
        // ...
      });
    }






    useEffect(()=>{
      
      if(user !== null && loading === false){
        console.log('User has already signed in and is redirected to account page')
        navigateTo("/profile" , {state:{error:'Already Signed In'}})
      } 
    },[loading])


    return ( 
<div className={styles.signUpPage}>
   <h1>SIGN UP</h1>
   <h2>Sign up with Email and Passwrod</h2>

    <form className={styles.signUpForm} onSubmit={emailAndPasswordSignUp}>
    <p className={styles.errorCode}>{errorCode}</p>
      <label>
        Name
        <input type="string"  required onChange={(e)=>{setCreateForm(current=>{return{...current , name:e.target.value}})}}/>
      </label>

      <label>
        Email
        <input type="email"  required onChange={(e)=>{setCreateForm(current=>{return{...current , email:e.target.value}})}}/>
      </label>

      <label>
        Password
        <input type="password" minLength="8" required onChange={(e)=>{setCreateForm(current=>{return{...current , password:e.target.value}})}}/>
      </label>

      <input className={styles.submitBtn} type="submit" value="Create Account"/>
    </form>



      <h3>Or...</h3>

   <button className={styles.signUpWith} onClick={googleSignUp}> Sign up with Google</button>
   <button className={styles.signUpWith} onClick={facebookSignUp}> Sign up with Facebook</button>

       <p>Already have an account ? <button onClick={()=>navigateTo('/signin')}>Sign In</button></p>
     </div>
     );
}

export default SignUpPage;