import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
function ProfilePage() {

    const navigateTo = useNavigate()

    
    const [user] = useAuthState(auth);
    if(user === null)  navigateTo("/signin")


    const onSignOut = ()=>{
        auth.signOut()
        
        .then(function() {
           console.log('Signout Succesfull')
           
           localStorage.setItem("userName", "")
           navigateTo('/signin')
        }, function(error) {
           console.log('Signout Failed')  
        });
    }
    



    return ( 
     <>
   <h1>YOUR PROFILE</h1>

   <button onClick={onSignOut} >
     Sign Out
    </button>

     </>
     );
}

export default ProfilePage;