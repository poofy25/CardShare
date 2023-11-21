import styles from './sendBackContactBtn.module.css'
import SendBackContact from './SendBackContact';
import { useState } from 'react';



function SendBackContactBtn(props) {
    console.log(props.data.cardData.generalData.fullname)
    return ( 
        <>
            <button onClick={()=>{props.setStatus(true)}} className={styles.btn}> Send back contact to {props.data.cardData.generalData.fullname}</button>
            
        </>
     );
}

export default SendBackContactBtn;