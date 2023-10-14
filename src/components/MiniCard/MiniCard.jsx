
import styles from './miniCard.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function MiniCardComponent(props) {

    const navigateTo = useNavigate()

    const data = props.data
    const formData = data.cardData
    const cardID = data.id
    

    const deleteCard = ()=>{


        async function deleteDocFromDb (){
            await deleteDoc(doc(db, "cards", cardID));
        }
        deleteDocFromDb()
        props.setCardDocs(
           current =>
                current.filter(doc => {
                  // 👇️ remove object that has id equal to 2
                  return doc.id !== cardID;
                }),
             
        )

    }
    console.log('Current Cards:',props.cardDocs , 'This Card', data)


    return ( 
<div className={styles.miniCard}>
      <h2>{formData.Name}</h2>
      <h3>{formData.Title}</h3>
      <h4>{formData.PhoneNumber}</h4>
      <h5>{formData.Email}</h5>

    <button onClick={(()=>{navigateTo(`/viewcard/${cardID}`)})}>View Card</button>
    <button>Edit Card</button>
    <button onClick={deleteCard} className={styles.deleteBtn}>Delete Card</button>

      </div>
     );
}

export default MiniCardComponent;