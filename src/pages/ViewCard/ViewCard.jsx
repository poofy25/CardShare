import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { useEffect , useState } from "react";

function ViewCardPage() {

    const params = useParams()
    console.log(params.id)
    const [cardData , setCardData] = useState(null)


    useEffect(()=>{

        async function getDataFromId (){
            const docRef = doc(db, "cards", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setCardData(docSnap.data())
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
        }
       getDataFromId()
    },[])

    if(cardData){
        return (
            <div>
              <h1>View Card</h1>
              <h1>{cardData.cardData.Name}</h1>
              <h2>{cardData.cardData.Title}</h2>
              <h3>{cardData.cardData.PhoneNumber}</h3>
              <h3>{cardData.cardData.Email}</h3>

            </div>
        )
    }


    return ( 

      <h1>No card with this id exists</h1>



     );
}

export default ViewCardPage;