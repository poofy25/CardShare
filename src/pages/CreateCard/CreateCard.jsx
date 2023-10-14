import styles from './createCard.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db  } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

function CreateCardPage() {

   const [user , loading] = useAuthState(auth);
   const navigateTo = useNavigate()

   const saveToDataBase = (cardData)=>{
      if(user&&!loading){
      async function saveData(){
         const docRef = await addDoc(collection(db, "cards"), {
          cardData , userId:user.uid
          });
       console.log(docRef.id)
       }
       saveData()
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
      saveToDataBase(formJson)
   }








    return ( 

     <div className={styles.createCard}>


        <h1>Create Your Card</h1>

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