import styles from './viewCard.module.css'


import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref , getDownloadURL } from "firebase/storage";
import { useEffect , useState } from "react";


function ViewCardPage() {

    const params = useParams()
    console.log(params.id)
    const [cardData , setCardData] = useState(null)
    const [imgRef , setImgRef] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)

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

    useEffect(()=>{
      if(cardData!==null){
       setImgRef(ref(storage, `cardImages/${cardData.cardData.imgUUID}`))
      }
    },[cardData])

    useEffect(()=>{
      if(imgRef !== null){
      getDownloadURL(imgRef)
      .then((url) => {
        setImgUrl(url)
      })
      .catch((error) => {

        console.log(error)
      })
    }

    },[imgRef])

    if(cardData){
        return (
            <div>
              <h1>View Card</h1>

              <img src={imgUrl} className={styles.image}/>
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