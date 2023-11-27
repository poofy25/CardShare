import styles from './saveContactBtn.module.css'
import getContrast from 'get-contrast'
import { useEffect } from 'react';

function SaveContactBtn(props) {

 
   
    useEffect(()=>{
       
        const displaySection =  document.querySelector(`.${styles.btn}`)
        console.log(props.colorPallete)
        if(displaySection){
            if(displaySection){
                displaySection.style.color = props.colorPallete.textColor
            }
          
        }
      
      
    },[props.colorPallete])
    return ( 
        <>
            <button style={{backgroundColor:props.colorPallete.darkerColor}} onClick={props.saveToContacts} className={styles.btn}>Save to Contacts</button>
            
        </>
     );
}

export default SaveContactBtn;