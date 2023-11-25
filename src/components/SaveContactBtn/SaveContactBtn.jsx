import styles from './saveContactBtn.module.css'
import getContrast from 'get-contrast'
import { useEffect } from 'react';

function SaveContactBtn(props) {

 
    const colorValues = (props.color).substring(4, (props.color).length-1)
                        .replace(/ /g, '')
                        .split(',');
    const lighterValue = 25
    const lighterColor = `rgb(${Number(colorValues[0]) - lighterValue},${Number(colorValues[1]) - lighterValue},${Number(colorValues[2]) - lighterValue})`
    console.log(props.color , colorValues , lighterColor)




    useEffect(()=>{
       
          const isAccessible = getContrast.isAccessible(props.color , 'rgb(255,255,255)')
          const displaySection =  document.querySelector(`.${styles.btn}`)
  
          if(displaySection){
            if(isAccessible){
              displaySection.style.color = 'rgba(255,255,255,0.9)'
            }else{
              displaySection.style.color = 'rgba(0,0,0,0.9)'
            }
        }
        
        
      },[props.color])
    return ( 
        <>
            <button style={{backgroundColor:lighterColor}} onClick={props.saveToContacts} className={styles.btn}>Save to Contacts</button>
            
        </>
     );
}

export default SaveContactBtn;