import { useEffect, useState } from 'react'
import styles from './SendBackContact.module.css'
import { addDoc , collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function SendBackContact(props) {

    const status = props.status
    const setStatus = props.setStatus
    const colorPallete= props.colorPallete
    if(status){
    const [formData, setFormData] = useState({
        fullname:null,
        title:null,
        email:null,
        phonenumber:null
    })

    const onSendBtn = ()=>{
        document.getElementById('sendBackContactForm').requestSubmit();
    }

    const formOnSubmit = (e)=>{
        e.preventDefault()
        sendingDataToDb()
    }


    const sendingDataToDb = ()=>{
        async function sendData(){
            const docRef = await addDoc(collection(db, "contactsrequests"), {
            requestData:formData , userId:props.data.userId
            });
        setStatus(false)
        document.getElementById('saveToContactsBtn')?.click()
        }
         sendData()
    }



    
    return ( 

    <div className={styles.container} onClick={(e)=>{if(false)setStatus(false)}} >
        <section className={styles.formSection} style={{backgroundColor:colorPallete.backgroundLightColor}}>
            <img src={props.imgUrl}/>    
            <button className={styles.xBtn} onClick={()=>{setStatus(false)}}>x</button>
           
            <form id="sendBackContactForm" className={styles.form} onSubmit={formOnSubmit}>
            <h1>Share your contact info back with <br/> {props.data.cardData.generalData.fullname}</h1>
            <span></span>
                <label>
                    <p>Name *</p>
                    <input type='text' placeholder='Your name' required onChange={(e)=>setFormData(current=>{return{...current , fullname:e.target.value }})}/>
                </label>
                <label>
                    <p>Job title</p>
                    <input type='text' placeholder='Your job title' onChange={(e)=>setFormData(current=>{return{...current , title:e.target.value }})} />
                </label>
                <label>
                    <p>Email *</p>
                    <input type='email' placeholder='Your email' required onChange={(e)=>setFormData(current=>{return{...current , email:e.target.value }})}/>
                </label>
                <label>
                    <p>Phone Number</p>
                    <input type='phone' placeholder='Your phone number' onChange={(e)=>setFormData(current=>{return{...current , phonenumber:e.target.value }})}/>
                </label>


            </form>
            <button  className={`${styles.shareBackBtn} ${document.getElementById('sendBackContactForm')?.checkValidity() && styles.valid}`} onClick={onSendBtn}>Share back contact</button>
        </section>
    </div>


     );
    }
}

export default SendBackContact;