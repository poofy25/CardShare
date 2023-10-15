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

function CreateCardPage() {

   const [user , loading] = useAuthState(auth);
   const navigateTo = useNavigate()
   const [picture , setPicture] = useState([])
   const [pictureUrl , setPictureUrl] = useState([])
   const pictureUUID = uuidv4()
   const storageRef = ref(storage, `cardImages/${pictureUUID}`);
   

   const saveToDataBase = (cardData)=>{
      if(user&&!loading){
      async function saveData(){
         const docRef = await addDoc(collection(db, "cards"), {
          cardData , userId:user.uid
          });
       console.log(docRef.id)
       }
       saveData()

       uploadBytes(storageRef, picture[0]).then((snapshot) => {
         console.log('Uploaded a blob or file!');
         console.log(snapshot)
       });






      navigateTo('/cards')


      }
   }

   const onSavingCard = (e)=>{
      //prevents the browser reloding
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      
      //getting the form data
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      if(picture.length > 0){
      saveToDataBase({...formJson , imgUUID: pictureUUID})
      }else{
         saveToDataBase(formJson)
      }
   }

   //On picture upload
   useEffect(()=>{
    if(picture.length > 0){
      const newPictureUrl = []

      newPictureUrl.push(URL.createObjectURL(picture[0]))
      console.log(newPictureUrl)
      setPictureUrl(newPictureUrl)
     
    }



   },[picture])






    return ( 

     <div className={styles.createCard}>


        <h1>Create Your Card</h1>
        <img src={pictureUrl} className={styles.picture}/>
        <label>
               Image
               <input name="Picture" type='file' accept='image/*' onChange={(e)=>{setPicture(e.target.files)}}/>
            </label>
       <form onSubmit={onSavingCard}>
           
        
            
            <label>
               Name
               <input name="Name" defaultValue="Your Name"/>
            </label>
            <label>
               Title
               <input name="Title"/>
            </label>
            <label>
               Phone Number
               <input name="PhoneNumber"/>
            </label>
            <label>
                Email
               <input name="Email"/>
            </label>
            <button type='submit' className={styles.saveCardBtn}>Save Card</button>

        </form>

        

     </div>


     );
}

export default CreateCardPage;