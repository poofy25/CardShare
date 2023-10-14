import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
function ProfilePage() {

    const navigateTo = useNavigate()
    const location = useLocation()
   // window.history.replaceState({}, document.title)
    const [user , loading] = useAuthState(auth);
     useEffect(()=>{
      if(user === null && !loading){
         console.log('User has not signed in and is redirected to sign in page!')
         navigateTo("/signin" , {state:{error:'You have not signed in'}})
      } 
    },[loading])

    const onSignOut = ()=>{
        auth.signOut()
        
        .then(function() {
           console.log('Signout Succesfull')
           
           localStorage.setItem("userName", "")
           navigateTo('/signin' , {state:{error:'Sign out Succesfull'}})
        }, function(error) {
           console.log('Signout Failed')  
        });
    }
    



    return ( 
     <>
   <h1>YOUR PROFILE</h1>
   <div>{location.state?.error}</div>

   <h2>Name : {user?.displayName}</h2>
   <p>Email : {user?.email}</p>





   <button onClick={onSignOut} >
     Sign Out
    </button>

     </>
     );
}

export default ProfilePage;