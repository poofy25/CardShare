import styles from './linkField.module.css'
import fieldValues from '../../functions/fields'
import isUrl from 'is-url'

import { useState , useEffect} from 'react'
import FieldsCreateCard from '../../pages/CreateCard/components/FieldsCreateCard'

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
   
        <input required name='fieldLink' onInvalid={()=>props.changeActiveComponent(<FieldsCreateCard/> , null , document.getElementById('fieldsCreateBtn'))} onChange={onInputLink} placeholder={`Username or ${field} Link`}></input>
       
        
        <input required name='fieldDisplay' onInvalid={()=>props.changeActiveComponent(<FieldsCreateCard/> , null , document.getElementById('fieldsCreateBtn'))} onChange={onInputDisplay} value={fieldData?.display} placeholder='Enter display text'></input>
        
    </label>



     );
}

export default LinkField;