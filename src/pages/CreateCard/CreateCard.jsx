import styles from './createCard.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db , storage  } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import { doc , getDoc , setDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import isUrl from 'is-url'
import fieldValues from '../../functions/fields';

import GeneralCreateCard from './components/GeneralCreateCard.jsx';
import DisplayCreateCard from './components/DisplayCreateCard.jsx';
import FieldsCreateCard from './components/FieldsCreateCard.jsx';


const cardNavComponents = {
   general:(<GeneralCreateCard/>),
   display:(<DisplayCreateCard/>),
   fields:(<FieldsCreateCard/>)
}


const validateFormsData = (data , fields)=>{

   let filteredData = {...data}
   const generalData = data.generalData
   let filtredGeneralData = {}
   const fieldsData = data.fieldsData

   if(Object.keys(generalData).length === 0) return false
   if(Object.keys(fields).length > 0 && Object.keys(fieldsData).length === 0) return false

   Object.entries(generalData).map(([key , value])=>{
      if(value) filtredGeneralData = {...filtredGeneralData , [key]:value}
   })

   filteredData = {...filteredData , generalData:filtredGeneralData}

   
   return filteredData
}





function CreateCardPage(props) {

   const [user , loading] = useAuthState(auth);
   const navigateTo = useNavigate()

   if(!user && loading == false )navigateTo('/signup')


   const [selectedFields , setSelectedFields] = useState({})
   const [imageUUID , setImageUUID] = useState({})
   const [picture , setPicture] = useState([])
   const [activeNavComponent , setActiveNavComponent] = useState(cardNavComponents.general)


   const params = useParams()
   const [cardData , setCardData] = useState(null)
   const [imgRef , setImgRef] = useState(null)
   const [imgUrl , setImgUrl] = useState(null)




   //CREATE CARD
   const changeActiveComponent = (component,event,btn)=>{

      //this handles button active class
     (document.querySelector(`.${styles.createCardNav}`).childNodes).forEach((child)=>{
        child.classList.remove(styles.active)
     })
     if(event!==null)event.target.classList.add(styles.active)
     if(btn!==null)btn.classList.add(styles.active)
     //changes active component
     if (component !== activeNavComponent){
        setActiveNavComponent(component)
      }
   }

   const saveToDataBase = (cardData)=>{

      if(user&&!loading){
         if(props.use ==='create'){
            async function saveData(){
               const docRef = await addDoc(collection(db, "cards"), {
               cardData , userId:user.uid
               });
            console.log(docRef.id)
            }
            saveData()
            
            if(cardData.displayData?.imageUUID){
            uploadBytes(ref(storage, `cardImages/${cardData.displayData.imageUUID}`), picture).then((snapshot) => {
               console.log('Uploaded a blob or file!');
               console.log(snapshot)
            });
            }
         }

         if(props.use ==='edit'){
            async function saveData(){
               const docRef = await setDoc(doc(db, `cards` , params.id), {
               cardData , userId:user.uid
               });
            }
            saveData()
            
            if(cardData.displayData?.imageUUID && picture.length !== 0){
            uploadBytes(ref(storage, `cardImages/${cardData.displayData.imageUUID}`), picture).then((snapshot) => {
               console.log('Uploaded a blob or file!');
               console.log(snapshot)
            });
            }
         }

      navigateTo('/cards')

       
      }
   }

   const onSavingCard = ()=>{


      const updatedData = {
         generalData:{},
         displayData:{},
         fieldsData:{},
      }
      document.getElementById("generalForm").onsubmit = function(e){
         e.preventDefault()
         updatedData.generalData = Object.fromEntries(new FormData(e.target))
      }
      document.getElementById("displayForm").onsubmit = function(e){
         e.preventDefault()
         updatedData.displayData = imageUUID
      }
      document.getElementById("fieldsForm").onsubmit = function(e){
         e.preventDefault()

         const updatedFieldsData = {}

         e.target.childNodes.forEach((node)=>{
            const nodeField = node.attributes.name.value
            const nodeLinkValue =  node.querySelector("input[name='fieldLink']").value
            const nodeDisplayValue =  node.querySelector("input[name='fieldDisplay']").value
            let nodeLink = nodeLinkValue
            if(isUrl(nodeLinkValue)){
               nodeLink = nodeLinkValue
               }else {
               nodeLink = fieldValues[nodeField].defaultLink + nodeLinkValue
              }



            updatedFieldsData[nodeField] = {link:nodeLink,display:nodeDisplayValue}
         })
        

         updatedData.fieldsData = updatedFieldsData
      }
   
 

   document.getElementById("generalForm").requestSubmit();
   document.getElementById("displayForm").requestSubmit();
   document.getElementById("fieldsForm").requestSubmit();


   if(validateFormsData(updatedData , selectedFields)){
      console.log(validateFormsData(updatedData , selectedFields))
      saveToDataBase(validateFormsData(updatedData , selectedFields))
   }



   }



// EDIT CARD


 //Fethces the card data from the database
 
 useEffect(()=>{
   if(props.use === 'edit' && user){
      console.log(user)
   async function getDataFromId (){
       const docRef = doc(db, "cards", params.id);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
          if(docSnap.data().userId !== user?.uid)navigateTo('/cards')
           setCardData(docSnap.data())
         } else {
           console.log("No such document!");
         }
   }
  getDataFromId()
}
},[user])
//Fetches image reference from storage after getting the card data
useEffect(()=>{
   if(props.use === 'edit' && user && cardData){
      console.log(cardData.cardData.generalData)
 if(cardData!==null){
  setImgRef(ref(storage, `cardImages/${cardData.cardData.displayData.imageUUID}`))
 }
}
},[cardData])
//Fetch the image url from the image reference
useEffect(()=>{
   if(props.use === 'edit' && user){
 if(imgRef !== null){
 getDownloadURL(imgRef)
 .then((url) => {
   setImgUrl(url)
 })
 .catch((error) => {

   console.log(error)
 })
}
   }
},[imgRef])




useEffect(()=>{
   console.log(cardData)
},[cardData])





console.log((props.use === 'edit' && user && !cardData))

    return ( 

     <div className={styles.createCard}>

        <div className={styles.createCardHeader}>
            <h1>{props.use === 'edit' ?'Edit Card' : 'Create Card'}</h1> 
            <button className={styles.saveCardBtn} onClick={onSavingCard}>SAVE</button>
        </div>
        
        <div className={styles.createCardNav}>
            <button id='generalCreateBtn' className={styles.active} onClick={(e)=>changeActiveComponent(cardNavComponents.general,e,null)}>General</button>
            <button id='displayCreateBtn' onClick={(e)=>changeActiveComponent(cardNavComponents.display,e,null)}>Display</button>
            <button id='fieldsCreateBtn' onClick={(e)=>changeActiveComponent(cardNavComponents.fields,e,null)}>Fields</button>
        </div>





         {(props.use === 'edit' && !cardData) ? 'Loading Card Data' :
          <>
            <GeneralCreateCard
               status={activeNavComponent.type.name === cardNavComponents.general.type.name ? 'active' : 'inactive'}
               changeActiveComponent={changeActiveComponent}
               cardNavComponents={cardNavComponents}
               compUse={props.use}
               cardGeneralData={props.use=='edit' && cardData !==null ? cardData?.cardData?.generalData : null}
            />
            <DisplayCreateCard  
               status={activeNavComponent.type.name === cardNavComponents.display.type.name ? 'active' : 'inactive'}
               setImageUUID={setImageUUID}
               setPicture={setPicture}
               picture={picture}
               compUse={props.use}
               cardDisplayData={props.use=='edit' && cardData !==null ? cardData?.cardData?.displayData : null}
               editImgUrl={imgUrl}
            />
            <FieldsCreateCard
               status={activeNavComponent.type.name === cardNavComponents.fields.type.name ? 'active' : 'inactive'}
               changeActiveComponent={changeActiveComponent}
               setSelectedFields={setSelectedFields}
               compUse={props.use}
               cardFieldsData={props.use=='edit' && cardData !==null ? cardData?.cardData?.fieldsData : null}
            />
          </>
        }





     </div>


     );
}

export default CreateCardPage;