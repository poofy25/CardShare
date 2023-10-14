import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , provider} from "../../firebase/firebase";
import { useNavigate   , useLocation} from "react-router-dom";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


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