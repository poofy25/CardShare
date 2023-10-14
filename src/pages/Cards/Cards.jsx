

import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignedOutComponent from "../../components/SignedOut/SignedOut";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";
import MiniCardComponent from "../../components/MiniCard/MiniCard";
import { useState } from "react";

function CardsPage() {

    const navigateTo = useNavigate()
    const location = useLocation()
    const [user , loading] = useAuthState(auth);
    const [cardDocs , setCardDocs] = useState([])
    

    useEffect(()=>{
        //Fetching all the cards that matches the uid of the user from firestoree
        if(user && !loading){
            const q = query(collection(db, "cards"), where("userId", "==", user.uid));
            console.log(q)

        async function getDocuments(){
               
                const querySnapshot = await getDocs(q);
                const allCardDocuments = []
                querySnapshot.forEach((doc) => {
                allCardDocuments.push(doc.data())
                });
 
                setCardDocs(allCardDocuments)
        }
        getDocuments()
        }
    
    },[loading])




    return (
        <div>
<h1>CARDS PAGE</h1>
{(!user && !loading) ? <SignedOutComponent/> : 
<>
<h2>Create cards</h2>
<button onClick={()=>{navigateTo('/createcard')}}>Create Card</button>

<div>
    {cardDocs.map((cardData)=>{
       console.log(cardData)
        return(
        <MiniCardComponent data={cardData.cardData}/>
        )
    })}
</div>

</>
}

</div>
      );
}

export default CardsPage;