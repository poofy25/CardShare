import styles from './linkField.module.css'
import fieldValues from '../../functions/fields'
import isUrl from 'is-url'

import { useState , useEffect} from 'react'
import FieldsCreateCard from '../../pages/CreateCard/components/FieldsCreateCard'

function LinkField(props) {


    const data = props.data.fieldLinkData
    const field = props.data.field
    const defaultFieldData = fieldValues[field]
    const setSelectedFields = props.setSelectedFields

    const [fieldData , setFieldData] = useState({
      link:defaultFieldData.defaultLink,
      display:data.display
    })

    const onInputLink = (e)=>{
     const value = e.target.value


     if(isUrl(value)){
     
      setFieldData(current=>{return{
       display:'' , link:value
      }})
      }else {
      setFieldData(current=>{return{
        display:value , link:defaultFieldData.defaultLink+value
      }})
     }


     
    }

    const onInputDisplay = (e)=>{
      const value = e.target.value 

      setFieldData(current=>{return{
        ...current , display:value
      }})
    }


    useEffect(()=>{
       setSelectedFields(current=>{return{
        ...current,[field]:{...fieldData}
      }})
    },[fieldData])






    return ( 

    <label name={field} className={styles.linkField}>
      <div className={styles.linkFieldHead}>
        <img src={fieldValues[field].icon}/>
        <h3>{field}</h3>
        <div className={styles.xBtn}  onClick={(e)=>{
            setSelectedFields(current=>{
              const {[field]:value, ...other} = current
               return(
                other
               )
            })
        }}>X</div>
      </div>
   
        <input required name='fieldLink' defaultValue={data.link.replace(defaultFieldData.defaultLink,'')} onInvalid={()=>props.changeActiveComponent(<FieldsCreateCard/> , null , document.getElementById('fieldsCreateBtn'))} onChange={onInputLink} placeholder={field== 'Email' ? 'Email address' : `Username or ${field} Link`}></input>
       
        
        <input required name='fieldDisplay' onInvalid={()=>props.changeActiveComponent(<FieldsCreateCard/> , null , document.getElementById('fieldsCreateBtn'))} onChange={onInputDisplay} value={fieldData?.display} placeholder='Enter display text'></input>
        
    </label>



     );
}

export default LinkField;