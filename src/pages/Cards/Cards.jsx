

import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignedOutComponent from "../../components/SignedOut/SignedOut";




function CardsPage() {

    const navigateTo = useNavigate()
    const location = useLocation()
    const [user , loading] = useAuthState(auth);

    return (
        <div>
<h1>CARDS PAGE</h1>
{(!user && !loading) ? <SignedOutComponent/> : 
<>
<h2>Create cards</h2>
<button onClick={()=>{navigateTo('/createcard')}}>Create Card</button>

</>
}

</div>
      );
}

export default CardsPage;