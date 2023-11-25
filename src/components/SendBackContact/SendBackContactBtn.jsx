import styles from './sendBackContactBtn.module.css'
import getContrast from 'get-contrast'
import { useEffect } from 'react';



function SendBackContactBtn(props) {

 
    const colorValues = (props.color).substring(4, (props.color).length-1)
                        .replace(/ /g, '')
                        .split(',');
    const lighterValue = 25
    const lighterColor = `rgb(${Number(colorValues[0]) - lighterValue},${Number(colorValues[1]) - lighterValue},${Number(colorValues[2]) - lighterValue})`






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
            <button style={{backgroundColor:props.color , borderColor:lighterColor}} onClick={()=>{props.setStatus(true)}} className={styles.btn}> Send back Contact </button>
            
        </>
     );
}

export default SendBackContactBtn;