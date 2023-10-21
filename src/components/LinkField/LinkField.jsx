import styles from './linkField.module.css'
import fieldValues from '../../functions/fields'
import isUrl from 'is-url'

import { useState , useEffect} from 'react'

import phoneIcon from '/src/assets/icons/phoneIcon.png'
import emailIcon from '/src/assets/icons/emailIcon.png'
import websiteIcon from '/src/assets/icons/websiteIcon.png'
import telegramIcon from '/src/assets/icons/telegramIcon.png'
import facebookIcon from '/src/assets/icons/facebookIcon.png'
import instagramIcon from '/src/assets/icons/instagramIcon.png'
import githubIcon from '/src/assets/icons/githubIcon.png'
import linkedInIcon from '/src/assets/icons/linkedInIcon.png'

const icons = {

  Phone:phoneIcon,
  Email:emailIcon,
  Website:websiteIcon,
  Telegram:telegramIcon,
  Facebook:facebookIcon,
  Instagram:instagramIcon,
  Github:githubIcon,
  LinkedIn:linkedInIcon

}



function LinkField(props) {


    
    const field = props.data.field
    const defaultFieldData = fieldValues[field]
    const setSelectedFields = props.setSelectedFields

    const [fieldData , setFieldData] = useState({
      link:defaultFieldData.defaultLink,
      display:''
    })

    const onInputLink = (e)=>{
     const value = e.target.value
     console.log(value)

     if(isUrl(value)){
      console.log('valid link')
      setFieldData(current=>{return{
       display:'' , link:value
      }})
    //  }else if(isUrl('https://'+value)){
    //   setFieldData(current=>{return{
    //     display:value , link:'https://'+value
    //   }})
      }else {
      setFieldData(current=>{return{
        display:value , link:defaultFieldData.defaultLink+value
      }})
     }


     
    }

    const onInputDisplay = (e)=>{
      const value = e.target.value 
      console.log(value)
      setFieldData(current=>{return{
        ...current , display:value
      }})
    }


    useEffect(()=>{
      console.log(fieldData)
       setSelectedFields(current=>{return{
        ...current,[field]:{...fieldData}
      }})
    },[fieldData])






    return ( 

    <label className={styles.linkField}>
      <div className={styles.linkFieldHead}>
        <h2>{field}</h2>
        <button type='button' onClick={()=>{
            setSelectedFields(current=>{
              const {[field]:value, ...other} = current
               return(
                other
               )
            })
        }}>X</button>
      </div>
        
        <input onChange={onInputLink} placeholder={`Username or ${field} Link`}></input>
        <input onChange={onInputDisplay} value={fieldData?.display} placeholder='Enter display text'></input>

    </label>



     );
}

export default LinkField;