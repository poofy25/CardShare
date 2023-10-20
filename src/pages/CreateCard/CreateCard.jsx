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
import { v4 as uuidv4 } from 'uuid';

import GeneralCreateCard from './components/GeneralCreateCard.jsx';
import DisplayCreateCard from './components/DisplayCreateCard.jsx';
import FieldsCreateCard from './components/FieldsCreateCard.jsx';


const cardNavComponents = {
   general:(<GeneralCreateCard/>),
   display:(<DisplayCreateCard/>),
   fields:(<FieldsCreateCard/>)
}





function CreateCardPage() {

   const [user , loading] = useAuthState(auth);
   const navigateTo = useNavigate()

   const [formsData , setFormsData] = useState({
      generalData:{},
      displayData:{},
      fieldsData:{}
   })
   const [picture , setPicture] = useState([])
   const [activeNavComponent , setActiveNavComponent] = useState(cardNavComponents.general)
   const pictureUUID = uuidv4()
   const storageRef = ref(storage, `cardImages/${pictureUUID}`);
   

   const changeActiveComponent = (component,event)=>{

      //this handles button active class
     (document.querySelector(`.${styles.createCardNav}`).childNodes).forEach((child)=>{
        child.classList.remove(styles.active)
     })
      event.target.classList.add(styles.active)
      
     //changes active component
     if (component !== activeNavComponent){
        setActiveNavComponent(component)
      }
   }


   const saveToDataBase = (cardData)=>{
      if(user&&!loading){
      async function saveData(){
         const docRef = await addDoc(collection(db, "cards"), {
          cardData , userId:user.uid
          });
       console.log(docRef.id)
       }
       saveData()

       uploadBytes(ref(storage, `cardImages/${cardData.displayData.imageUUID}`), picture).then((snapshot) => {
         console.log('Uploaded a blob or file!');
         console.log(snapshot)
       });






      navigateTo('/cards')


      }
   }

   const onSavingCard = ()=>{
 
      saveToDataBase(formsData)

   }



   useEffect(()=>{
      console.log(picture)
   },[picture])






    return ( 

     <div className={styles.createCard}>

        <div className={styles.createCardHeader}>
            <h1>Create Card</h1> 
            <button className={styles.saveCardBtn} onClick={onSavingCard}>Save</button>
        </div>
        
        <div className={styles.createCardNav}>
            <button className={styles.active} onClick={(e)=>changeActiveComponent(cardNavComponents.general,e)}>General</button>
            <button onClick={(e)=>changeActiveComponent(cardNavComponents.display,e)}>Display</button>
            <button onClick={(e)=>changeActiveComponent(cardNavComponents.fields,e)}>Fields</button>
        </div>

        <GeneralCreateCard  status={activeNavComponent === cardNavComponents.general ? 'active' : 'inactive'} setFormsData={setFormsData}/>
        <DisplayCreateCard status={activeNavComponent === cardNavComponents.display ? 'active' : 'inactive'} setFormsData={setFormsData} setPicture={setPicture} picture={picture}/>
        <FieldsCreateCard  status={activeNavComponent === cardNavComponents.fields ? 'active' : 'inactive'}  setFormsData={setFormsData}/>
        
     </div>


     );
}

export default CreateCardPage;