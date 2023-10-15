import styles from './viewCard.module.css'


import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref , getDownloadURL } from "firebase/storage";
import { useEffect , useState } from "react";

const contactEx = {
  number:null,
  name:null,
  img:null,
  email:null
}


function ViewCardPage() {

    const params = useParams()
    console.log(params.id)
    const [cardData , setCardData] = useState(null)
    const [imgRef , setImgRef] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)
    const [contactData , setContactData] = useState(null)


   const saveToContacts = ()=>{
    if(contactData!==null){
      console.log('it should work')
    var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:"
     + contactData.name + 
     "\nTEL;TYPE=work,voice:" + contactData.number 
     + "\nEMAIL:" + contactData.email 
    // + `\nPHOTO;TYPE=JPEG;ENCODING=b:[${imgUrl}]`
     + `\nPHOTO;JPEG:${imgUrl + '.jpeg'}`
     + `\nTITLE:${contactData.title}`
     + "\nEND:VCARD";



    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);
    
    const newLink = document.createElement('a');
    newLink.download = contactData.name + ".vcf";
    newLink.textContent = contactData.name;
    newLink.href = url;
      console.log(newLink)
    newLink.click();
    }

   }




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
        console.log('IMG URL : ' , url)
        setImgUrl(url)
      })
      .catch((error) => {

        console.log(error)
      })
    }

    },[imgRef])
    //sets contactData 
    useEffect(()=>{
      if(imgUrl!==null){
      setContactData({
        name:cardData.cardData.Name,
        number:cardData.cardData.PhoneNumber,
        email:cardData.cardData.Email,
        img:imgUrl,
        title:cardData.cardData.Title
      })

    }

    },[imgUrl])

    if(cardData){
        return (
            <div>
              <h1>View Card</h1>

              <img src={imgUrl} className={styles.image}/>
              <h1>{cardData.cardData.Name}</h1>
              <h2>{cardData.cardData.Title}</h2>
              <h3>{cardData.cardData.PhoneNumber}</h3>
              <h3>{cardData.cardData.Email}</h3>


              <button onClick={saveToContacts}>SAVE TO CONTACTS</button>

            </div>
        )
    }


    return ( 

      <h1>No card with this id exists</h1>



     );
}

export default ViewCardPage;