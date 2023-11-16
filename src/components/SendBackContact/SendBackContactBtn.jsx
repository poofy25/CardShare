import styles from './sendBackContactBtn.module.css'
import SendBackContact from './SendBackContact';
import { useState } from 'react';



function SendBackContactBtn(props) {
    console.log(props.data.cardData.generalData.fullname)

    const [status , setStatus] = useState(false)

    return ( 
        <>
            <button onClick={()=>{setStatus(true)}} className={styles.btn}> Send Back Contact Info to {props.data.cardData.generalData.fullname}</button>
            <SendBackContact status={status} setStatus={setStatus} data={props.data} imgUrl={props.imgUrl}/>
        </>
     );
}

export default SendBackContactBtn;