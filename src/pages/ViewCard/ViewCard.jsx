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

import ColorThief from 'colorthief'
import getContrast from 'get-contrast'

import LoadingComponent from '../../components/Loading/Loading';
import SendBackContactBtn from '../../components/SendBackContact/SendBackContactBtn';
import SendBackContact from '../../components/SendBackContact/SendBackContact';
import SaveContactBtn from '../../components/SaveContactBtn/SaveContactBtn';


import shareIcon from '/src/assets/icons/shareIcon.svg'
import arrowLeftIcon from '/src/assets/icons/arrowLeftIcon.svg'


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

    const [imgColor , setImageColor] = useState('rgb(0,0,0)')
    const [imgRef , setImgRef] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)
    const [imgBase64 , setImgBase64] = useState(null)

    const [contactData , setContactData] = useState(null)

    const [sendBackContactStatus , setSendBackContactStatus] = useState(true)


   const saveToContacts = ()=>{

    if(contactData!==null){
    var vCard = createVCard(contactData , imgBase64)
   
        var blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        const newLink = document.createElement('a');
        newLink.download = generalData.fullname + ".vcf";
        newLink.textContent = generalData.fullname;
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

      const colorThief = new ColorThief();
      const img = document.querySelector(`.${styles.profilePicture}`);
      img.crossOrigin = "Anonymous";

      if (img.complete) {
        const colorValues = colorThief.getColor(img ,[5])
        const rgbValue = `rgb(${colorValues[0]}, ${colorValues[1]},${colorValues[2]})`
        setImageColor(rgbValue)
      } else {
        img.addEventListener('load', function() {
          const colorValues = colorThief.getColor(img ,[5])
          const rgbValue = `rgb(${colorValues[0]}, ${colorValues[1]},${colorValues[2]})`
          setImageColor(rgbValue)
        });
      }






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

    useEffect(()=>{
      if(imgColor){
        const isAccessible = getContrast.isAccessible(imgColor , 'rgb(255,255,255)')
        console.log(imgColor , isAccessible)
        const displaySection =  document.querySelector(`.${styles.displaySection}`)

        if(displaySection){
          displaySection.style.backgroundColor = imgColor

          if(isAccessible){
            displaySection.style.color = 'rgba(255,255,255,0.9)'
          }else{
            displaySection.style.color = 'rgba(0,0,0,0.9)'
          }
      }
      }
      
    },[imgColor])


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
              
              {/* <button className={styles.closeBtn} onClick={()=>{navigateTo('/cards')}}>X</button> */}
              <section className={styles.displaySection}>
                <div className={styles.displaySectionHeader}>
                  <button onClick={()=>{navigateTo('/cards')}}><img src={arrowLeftIcon}/></button>
                  <button><img src={shareIcon}/></button>
                </div>
                <img src={imgUrl} className={styles.profilePicture}/>
                
                <h3>{generalData.title}{generalData.company && ` · ${generalData.company}`}</h3>
                <h1>{generalData.fullname}</h1>

                <SaveContactBtn  saveToContacts={saveToContacts}  color={imgColor}/>
                <SendBackContactBtn color={imgColor} data={cardData} status={sendBackContactStatus} setStatus={setSendBackContactStatus}/>
                
              </section>
              
              
              <SendBackContact status={sendBackContactStatus} setStatus={setSendBackContactStatus} data={cardData} imgUrl={imgUrl}/>
        

              {generalData.headline && <h3 className={styles.headline}>{generalData.headline}</h3> }



              <span className={styles.contactData}>
              {generalData?.phone && 
              <a><img src={icons.Phone}/>{generalData?.phone}</a>}

              {Object.entries(fieldsData).map(([field,data])=>{
           return <a href={field=="Email" ? `mailto:${data.link}` :  data.link} key={field}><img src={fieldValues[field].icon}/>{data.display}</a>
        })}
              </span>
              <span className={styles.saveBtnWrapper}>
              
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