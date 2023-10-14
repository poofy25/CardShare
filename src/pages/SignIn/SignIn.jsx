import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , provider} from "../../firebase/firebase";
import { useNavigate   , useLocation} from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from "firebase/firestore"
import { getDoc , doc , setDoc } from "firebase/firestore";
import { db  } from "../../firebase/firebase";

function SignInPage() {


  const navigateTo = useNavigate()
  const location = useLocation();

  const [user , loading] = useAuthState(auth);
     useEffect(()=>{
      
      if(user !== null && loading === false){
        console.log('User has already signed in and is redirected to account page')
        navigateTo("/profile" , {state:{error:'Already Signed In'}})
      } 
    },[loading])

    const onSingIn = ()=>{
        signInWithPopup(auth , provider).then((result) => {
    
            let email = result.user.email
            let name = result.user.displayName
      
            const userData = {
              userEmail:email,
              userName:name
            }
            localStorage.setItem("userName" , name)
            console.log('Sign In Succesfull')
            navigateTo('/profile' , {state:{error:'Sign in Succesfull'}})
            return
           }).catch((error) => {
            console.log(error)
           })
    }



    useEffect(()=>{
      //This sets the user data when a user connects and syncs the cart content
     const onAuth =  auth.onAuthStateChanged(user =>{
       if (user && user.displayName !== localStorage.getItem('userName')){

        async function onLogIn (){
          const userRef = doc(db , `users/${user.uid}`);
         async function writeData(){
             const docData = {
             uid: user.uid,
             name:user.displayName,
             email:user.email,
             updatedAt:serverTimestamp(),
     
     
     
             };
           
         try {
          await setDoc(userRef , docData , {merge:true})
          console.log("Loged in and sent data to db" , docData)
     
         } catch (e) {
           console.error("Error adding document: ", e);
         }
        
       }
       await writeData()
     
     
    
     
     };
     onLogIn()
     }
     })
   
     //removes the event listener
     return onAuth
   },[])












    return ( 
<>
   <h1>SIGN IN</h1>
   <div>{location.state?.error}</div>
   <button onClick={onSingIn}>
        Sign in with Google
        </button>


     </>
     );
}

export default SignInPage;