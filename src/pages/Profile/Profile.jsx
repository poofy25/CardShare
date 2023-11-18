import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignedOutComponent from "../../components/SignedOut/SignedOut";
function ProfilePage() {

    const navigateTo = useNavigate()
    const location = useLocation()
    const [user , loading] = useAuthState(auth);

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
   

   {(!user && !loading) ? <SignedOutComponent/> :
     <>
         <h1>YOUR PROFILE</h1>
        <div>{location.state?.error}</div>
        <h2>Name : {user?.displayName}</h2>
        <p>Email : {user?.email}</p>
        <button onClick={onSignOut}>Sign Out</button>

     </>
}
     </>
     );
}

export default ProfilePage;