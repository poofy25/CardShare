

import { auth , provider } from "../../firebase/firebase"
import { signInWithPopup , getAdditionalUserInfo} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function SignUpPage() {
  
  const navigateTo = useNavigate()

  const [user , loading] = useAuthState(auth);
     useEffect(()=>{
      
      if(user !== null && loading === false){
        console.log('User has already signed in and is redirected to account page')
        navigateTo("/profile" , {state:{error:'Already Signed In'}})
      } 
    },[loading])

    const onSingUp = ()=>{
      signInWithPopup(auth , provider).then((result) => {
        if(getAdditionalUserInfo(result).isNewUser){
        console.log('Creating New Account')
        
          let email = result.user.email
          let name = result.user.displayName
    
          const userData = {
            userEmail:email,
            userName:name
          }
          console.log(auth.currentUser)
          localStorage.setItem("userName" , name)
          navigateTo('/account')
          return console.log(userData)
        }else{
          auth.signOut()
          navigateTo("/signin" , {state:{error:'Account already exists'}})
          throw new Error ('Account Already Exists')
          
        }
         }).catch((error) => {
          console.log(error)
         })
  }








    return ( 
<>
   <h1>SIGN UP</h1>
   <button onClick={onSingUp}>
        Sign up with Google
        </button>


     </>
     );
}

export default SignUpPage;