import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , provider} from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";





function SignInPage() {


  const navigateTo = useNavigate()

    const onSingIn = ()=>{
        signInWithPopup(auth , provider).then((result) => {
           // if(getAdditionalUserInfo(result).isNewUser)console.log('You shound sign up, not sign in')
    
            let email = result.user.email
            let name = result.user.displayName
      
            const userData = {
              userEmail:email,
              userName:name
            }
            localStorage.setItem("userName" , name)
            navigateTo('/profile')
            return
           }).catch((error) => {
            console.log(error)
           })
    }








    return ( 
<>
   <h1>SIGN IN</h1>
   <button onClick={onSingIn}>
        Sign in with Google
        </button>


     </>
     );
}

export default SignInPage;