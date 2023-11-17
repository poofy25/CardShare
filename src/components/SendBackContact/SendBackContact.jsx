import { useEffect, useState } from 'react'
import styles from './SendBackContact.module.css'
import { addDoc , collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function SendBackContact(props) {

    const status = props.status
    const setStatus = props.setStatus
    if(status){
    const [formData, setFormData] = useState({
        fullname:null,
        title:null,
        email:null,
        phonenumber:null
    })


    const formOnSubmit = (e)=>{
        e.preventDefault()
        sendingDataToDb()
    }


    const sendingDataToDb = ()=>{
        async function sendData(){
            const docRef = await addDoc(collection(db, "contactsrequests"), {
            requestData:formData , userId:props.data.userId
            });
         console.log(docRef.id)
         }
         sendData()
    }



    
    return ( 

    <div className={styles.container} onClick={(e)=>{if(e.target === e.currentTarget)setStatus(false)}} >
        <section className={styles.formSection}>
            <img src={props.imgUrl}/>    
            <h1>Share your contact info back with <br/> {props.data.cardData.generalData.fullname}</h1>
            <span></span>
            <form id="sendBackContactForm" onSubmit={formOnSubmit}>

                <label>
                    <p>Name *</p>
                    <input type='text' required onChange={(e)=>setFormData(current=>{return{...current , fullname:e.target.value }})}/>
                </label>
                <label>
                    <p>Job title</p>
                    <input type='text' onChange={(e)=>setFormData(current=>{return{...current , title:e.target.value }})} />
                </label>
                <label>
                    <p>Email *</p>
                    <input type='email' required onChange={(e)=>setFormData(current=>{return{...current , email:e.target.value }})}/>
                </label>
                <label>
                    <p>Phone Number</p>
                    <input type='phone' onChange={(e)=>setFormData(current=>{return{...current , phonenumber:e.target.value }})}/>
                </label>


            </form>
            <button  className={`${styles.shareBackBtn} ${document.getElementById('sendBackContactForm')?.checkValidity() && styles.valid}`} onClick={()=>{document.getElementById('sendBackContactForm').requestSubmit();}}>Share back contact</button>
        </section>
    </div>


     );
    }
}

export default SendBackContact;