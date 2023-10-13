

import { useNavigate } from "react-router-dom"





function HomePage() {

    const navigateTo = useNavigate()


    return ( 
       <div>
      <h1>

        CardShare

      </h1>
   
         <button onClick={()=>{navigateTo('/signin')}}>Sign In</button>

         <button onClick={()=>{navigateTo('/signup')}}>Sign Up</button>

      </div>
     );
}

export default HomePage;