

import { useNavigate } from "react-router-dom";








function SignedOutComponent() {

    const navigateTo = useNavigate()


    return ( 

    <div>

       <h2>You are signed out</h2>
       <h3>Sign in or Sign up Here</h3>
       <button onClick={()=>{navigateTo('/signin')}}>Sign In</button>
       <button onClick={()=>{navigateTo('/signup')}}>Sign Up</button>

    </div>



     );
}

export default SignedOutComponent;