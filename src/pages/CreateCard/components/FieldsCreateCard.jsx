import { useState, useEffect } from "react";
import LinkFieldBtn from "../../../components/LinkField/LinkFieldBtn";
import LinkField from "../../../components/LinkField/LinkField";

import styles from './fieldsCreateCard.module.css'


function FieldsCreateCard(props) {

    const status = props.status
    const setAllSelectedFields = props.setSelectedFields
    const [selectedFields , setSelectedFields] = useState({})
  

    const compUse = props.compUse
    const isEdit = compUse == 'edit'
    const cardFieldsData = props.cardFieldsData


    useEffect(()=>{
      setAllSelectedFields(selectedFields)
    },[selectedFields])

    useEffect(()=>{
      if(isEdit){
        setSelectedFields(cardFieldsData)
      }
    },[])



    return (  
<div className={`${styles.fieldsEdit} ${status==='active' && styles.active}`}>
     <h1>Fields</h1>

      <form className={styles.selectedFields} id='fieldsForm' >

        {Object.entries(selectedFields).map(([field,data])=>{
           console.log(field,data)
           return <LinkField data={{field:field,fieldLinkData:data}} key={field} setSelectedFields={setSelectedFields} changeActiveComponent={props.changeActiveComponent}/>
        })}


      </form>



    <div>

    <h3>Social</h3>

    <LinkFieldBtn   data={{icon:'',text:'Instagram' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'TikTok' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Facebook' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Twitter' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'LinkedIn' }} setSelectedFields={setSelectedFields}/>


    <h3>Communication</h3>
    <LinkFieldBtn   data={{icon:'',text:'Telegram' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Whatsapp' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Email' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Discord' }} setSelectedFields={setSelectedFields}/>
    
    <h3>Other</h3>
    <LinkFieldBtn   data={{icon:'',text:'Website' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Github' }} setSelectedFields={setSelectedFields}/>



    </div>





</div>    
    );
}

export default FieldsCreateCard;