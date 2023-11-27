import styles from './sendBackContactBtn.module.css'
import getContrast from 'get-contrast'
import { useEffect } from 'react';



function SendBackContactBtn(props) {

 

    useEffect(()=>{
       
        const displaySection =  document.querySelector(`.${styles.btn}`)

        if(displaySection){
            displaySection.style.color = props.colorPallete.textColor
        }
      
      
    },[props.colorPallete])



    return ( 
        <>
            <button style={{backgroundColor:props.colorPallete.color, borderColor:props.colorPallete.darkerColor}} onClick={()=>{props.setStatus(true)}} className={styles.btn}> Send back Contact </button>
            
        </>
     );
}

export default SendBackContactBtn;