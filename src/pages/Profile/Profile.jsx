import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignedOutComponent from "../../components/SignedOut/SignedOut";
function ProfilePage() {

    const navigateTo = useNavigate()
    const location = useLocation()
    const [user , loading] = useAuthState(auth);
console.log(user)

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

   {(!user && !loading) ? <SignedOutComponent/> :
     <>

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