import styles from './viewCard.module.css'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { ref , getDownloadURL} from "firebase/storage";
import { useEffect , useState } from "react";
import getBase64FromUrl from '../../functions/getBase64';
import { useNavigate } from 'react-router-dom';
import createVCard from '../../functions/createVCard';
import fieldValues from '../../functions/fields';

import LoadingComponent from '../../components/Loading/Loading';
import SendBackContactBtn from '../../components/SendBackContact/SendBackContactBtn';

import phoneIcon from '/src/assets/icons/phoneIcon.png'
import emailIcon from '/src/assets/icons/emailIcon.png'
import websiteIcon from '/src/assets/icons/websiteIcon.png'
import telegramIcon from '/src/assets/icons/telegramIcon.png'
import facebookIcon from '/src/assets/icons/facebookIcon.png'
import instagramIcon from '/src/assets/icons/instagramIcon.png'
import githubIcon from '/src/assets/icons/githubIcon.png'
import linkedInIcon from '/src/assets/icons/linkedInIcon.png'



const icons = {

  Phone:phoneIcon,
  Email:emailIcon,
  Website:websiteIcon,
  Telegram:telegramIcon,
  Facebook:facebookIcon,
  Instagram:instagramIcon,
  Github:githubIcon,
  LinkedIn:linkedInIcon



}



function ViewCardPage() {

    const navigateTo = useNavigate()

    const params = useParams()
    const [cardData , setCardData] = useState(null)
    const [loading,setLoading] = useState(true)
    const generalData = cardData?.cardData?.generalData
    const displayData = cardData?.cardData?.displayData
    const fieldsData = cardData?.cardData?.fieldsData
    const [imgRef , setImgRef] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)
    const [imgBase64 , setImgBase64] = useState(null)
    const [contactData , setContactData] = useState(null)


   const saveToContacts = ()=>{

    if(contactData!==null){
    var vCard = createVCard(contactData , imgBase64)
   
        var blob = new Blob([vCard], { type: "text/vcard" });
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
          setLoading(true)
            const docRef = doc(db, "cards", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
               
                setCardData(docSnap.data())
                setLoading(false)
              } else {
                setLoading(false)
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
          ...cardData.cardData , img:imgUrl,
        })
      }
    },[imgBase64])

    useEffect(()=>{
      if(contactData){
      // document.getElementById('saveToContactsBtn').click()
      }
    },[contactData])

    if(cardData){
        return (
            <div className={styles.viewCardPage}>
              <button className={styles.closeBtn} onClick={()=>{navigateTo('/cards')}}>X</button>
              <img src={imgUrl} className={styles.image}/>
              <SendBackContactBtn data={cardData} imgUrl={imgUrl}/>
              <span className={styles.cardHead}>
                <h1>{generalData.fullname}</h1>
                <h2>{generalData.title}</h2>
                <h2 style={{fontWeight:400}}>{generalData.company}</h2>
              </span>

              {generalData.headline && <h3 className={styles.headline}>{generalData.headline}</h3> }



              <span className={styles.contactData}>
              {generalData?.phone && 
              <a><img src={icons.Phone}/>{generalData?.phone}</a>}

              {Object.entries(fieldsData).map(([field,data])=>{
           return <a href={field=="Email" ? `mailto:${data.link}` :  data.link} key={field}><img src={fieldValues[field].icon}/>{data.display}</a>
        })}
              </span>
              <span className={styles.saveBtnWrapper}>
              <button id='saveToContactsBtn' onClick={saveToContacts} className={styles.saveBtn}>SAVE TO CONTACTS</button>
              </span>
            </div>
        )
    }

    if (loading){
     return(
      <LoadingComponent/>
     )
    }
    return ( 
      
      <h1>No card with this id exists</h1>



     );
}

export default ViewCardPage;