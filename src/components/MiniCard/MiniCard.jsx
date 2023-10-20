
import styles from './miniCard.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ref , deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
function MiniCardComponent(props) {

    const navigateTo = useNavigate()
    const data = props.data
    const cardData = data.cardData
    const generalData = cardData.generalData
    const displayData = cardData.displayData
    const cardID = data.id
    const pictureRef = ref(storage, `cardImages/${displayData.imageUUID}`);
    

     console.log(cardData , generalData , displayData)
    const deleteCard = ()=>{


        async function deleteDocFromDb (){
            await deleteDoc(doc(db, "cards", cardID));
        }
        deleteDocFromDb()
        deleteObject(pictureRef).then(() => {
          console.log('file deleted succesfuly')
        }).catch((error) => {
        console.log(error)
        });
        props.setCardDocs(
           current =>
                current.filter(doc => {
                 
                  return doc.id !== cardID;
                }),
             
        )

    }
    console.log('Current Cards:',props.cardDocs , 'This Card', data)


    return ( 
<div className={styles.miniCard}>
      <h2>{generalData.cardname}</h2>


    <button onClick={(()=>{navigateTo(`/viewcard/${cardID}`)})}>View Card</button>
    <button>Edit Card</button>
    <button onClick={deleteCard} className={styles.deleteBtn}>Delete Card</button>

      </div>
     );
}

export default MiniCardComponent;