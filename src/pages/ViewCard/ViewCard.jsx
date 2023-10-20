import styles from './viewCard.module.css'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref , getDownloadURL} from "firebase/storage";
import { useEffect , useState } from "react";
import getBase64FromUrl from '../../functions/getBase64';
import { useNavigate } from 'react-router-dom';


import phoneIcon from '/src/assets/icons/phoneIcon.png'
import emailIcon from '/src/assets/icons/emailIcon.png'

function ViewCardPage() {

    const navigateTo = useNavigate()

    const params = useParams()
    const [cardData , setCardData] = useState(null)
    const generalData = cardData?.cardData?.generalData
    const displayData = cardData?.cardData?.displayData
    const fieldsData = cardData?.cardData?.fieldsData
    const [imgRef , setImgRef] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)
    const [imgBase64 , setImgBase64] = useState(null)
    const [contactData , setContactData] = useState(null)


   const saveToContacts = ()=>{
    if(contactData!==null){
       //Creating the vCard information
       var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:"
        + contactData.name + 
        "\nTEL;TYPE=work,voice:" + contactData.number 
        + "\nEMAIL:" + contactData.email 
        + `\nPHOTO;ENCODING=BASE64;TYPE=JPEG:${imgBase64}`
        + `\nTITLE:${contactData.title}`
        + "\nEND:VCARD";



        var blob = new Blob([vcard], { type: "text/vcard" });
        var url = URL.createObjectURL(blob);
        
        const newLink = document.createElement('a');
        newLink.download = contactData.name + ".vcf";
        newLink.textContent = contactData.name;
        newLink.href = url;
        newLink.click();
    }
   }



    //Fethces the card data from the database
    useEffect(()=>{

        async function getDataFromId (){
            const docRef = doc(db, "cards", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
               
                setCardData(docSnap.data())
              } else {
                console.log("No such document!");
              }
        }
       getDataFromId()
    },[])
    //Fetches image reference from storage after getting the card data
    useEffect(()=>{
      if(cardData!==null){
       setImgRef(ref(storage, `cardImages/${cardData.cardData.displayData.imageUUID}`))
      }
    },[cardData])
    //Fetch the image url from the image reference
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
    //Transform the image url to base64 for the vcf.file
    useEffect(()=>{

     if(imgUrl!==null){
        var base64Img 
        async function getBase64(){
           await getBase64FromUrl(imgUrl).then((result)=>{
              base64Img = result.replace("data:image/jpeg;base64,", "");
              setImgBase64(base64Img)
           })
        }
        getBase64()
     }

    },[imgUrl])
    //Sets contactData 
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
    },[imgBase64])

    if(cardData){
        return (
            <div className={styles.viewCardPage}>
              <button className={styles.closeBtn} onClick={()=>{navigateTo('/cards')}}>X</button>
              <img src={imgUrl} className={styles.image}/>

              <span className={styles.cardHead}>
                <h1>{generalData.fullname}</h1>
                <h2>{generalData.title}</h2>
                <h2 style={{fontWeight:400}}>{generalData.company}</h2>
              </span>

              <h3 className={styles.headline}>{generalData.headline}</h3>

              <span className={styles.contactData}>


              {Object.entries(fieldsData).map(([field,data])=>{
           return <a key={field}><img src={phoneIcon}/>{data.link}</a>
        })}
              </span>
              <span className={styles.saveBtnWrapper}>
              <button onClick={saveToContacts} className={styles.saveBtn}>SAVE TO CONTACTS</button>
              </span>
            </div>
        )
    }


    return ( 

      <h1>No card with this id exists</h1>



     );
}

export default ViewCardPage;