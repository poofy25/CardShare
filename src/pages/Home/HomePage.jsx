

import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";



function HomePage() {

    const navigateTo = useNavigate()
    const [user , loading] = useAuthState(auth);

    return ( 
       <div>
      <h1>

        CardShare

      </h1>

      <h2>{(user && loading === false) ?'You are signed in' : (!user && loading === false) ? 'You are not signed in' : ''}</h2>
   
         <button onClick={()=>{navigateTo('/signin')}}>Sign In</button>
         <button onClick={()=>{navigateTo('/signup')}}>Sign Up</button>
         <button onClick={()=>{navigateTo('/profile')}}>Profile</button>

      </div>
     );
}

export default HomePage;