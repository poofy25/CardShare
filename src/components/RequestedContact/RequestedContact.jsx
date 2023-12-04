import styles from './requestedContact.module.css'
import { doc , deleteDoc , addDoc , collection} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { serverTimestamp } from 'firebase/firestore';

import defaultPfp from '/src/assets/svgIcons/defaultpfp.svg'

function RequestedContact(props) {
    const data = props.data
    const user = props.user
    const requestData = data.requestData
    const setRequests = props.setRequests
   

    const onAcceptingRequest = async()=>{

        try{
        const docRef = await addDoc(collection(db, `usercontacts/${user.uid}/contacts`), {
            contactData:requestData, 
            requestCreatedAt : data.createdAt ,
            createdAt : {formatted:serverTimestamp() , unformatted:Date.now()}
        })
        .then(

            await deleteDoc(doc(db, "contactsrequests", data.id))
            .then(
                setRequests( current =>
                    current.filter(doc => {
                     
                      return doc.id !== data.id;
                    }),
                 )
            )

        )
        }catch(e){
            console.log(e)
        }
       

    }

    const onDenyingRequest = async ()=>{
        
        await deleteDoc(doc(db, "contactsrequests", data.id))
        .then(
            setRequests( current =>
                current.filter(doc => {
                 
                  return doc.id !== data.id;
                }),
             )
        )

    }


    return ( 
        <div className={styles.request}>
            <img src={defaultPfp}/>
            <span className={styles.requestName}>
            <h4>{requestData.fullname}</h4>
            {requestData.title && <h5>{requestData.title}</h5>}
            </span>
            <span className={styles.requestBtns}>
            <button onClick={onAcceptingRequest}>Accept</button>
            <button onClick={onDenyingRequest}>Deny</button>
            </span>
        </div>
     );
}

export default RequestedContact;