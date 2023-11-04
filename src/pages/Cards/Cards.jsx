import styles from './cards.module.css'


import { auth } from "../../firebase/firebase";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import SignedOutComponent from "../../components/SignedOut/SignedOut";
import MiniCardPopUp from '../../components/MiniCardPopUp/MiniCardPopUp';
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
    const [selectedCard , setSelectedCard] = useState({active:false})
    

    useEffect(()=>{
        //Fetching all the cards that matches the uid of the user from firestoree
        if(user && !loading){
            const q = query(collection(db, "cards"), where("userId", "==", user.uid));

        async function getDocuments(){
               
                const querySnapshot = await getDocs(q);
                const allCardDocuments = []
                querySnapshot.forEach((doc) => {
                allCardDocuments.push({...doc.data(), id:doc.id})
                });
                 
                setCardDocs(allCardDocuments)
        }
        getDocuments()
        }
    
    },[loading])

    useEffect(()=>{
        console.log(selectedCard)
    },[selectedCard])


return (
<section className={styles.cardPage}>
    <div className={styles.cardsPageHeader}>CARDS PAGE</div>
    <MiniCardPopUp data={selectedCard} setSelectedCard={setSelectedCard} setCardDocs={setCardDocs}/>
    {(!user && !loading) ? <SignedOutComponent/> : 
    <>

        <div className={styles.cardsContainer}>
            <button className={styles.createCardBtn} onClick={()=>{navigateTo('/createcard')}}>+ <br/> Create Card</button>
            {cardDocs.map((cardData)=>{
            
                return(
                <MiniCardComponent data={{...cardData}} cardDocs={cardDocs} setCardDocs={setCardDocs} setSelectedCard={setSelectedCard}/>
                )
            })}
        </div>

    </>
    }

</section>

);
}

export default CardsPage;