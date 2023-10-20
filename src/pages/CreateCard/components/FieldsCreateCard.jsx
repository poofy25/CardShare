import { useState, useEffect } from "react";
import LinkFieldBtn from "../../../components/LinkField/LinkFieldBtn";
import LinkField from "../../../components/LinkField/LinkField";

import styles from './fieldsCreateCard.module.css'


function FieldsCreateCard(props) {

    const status = props.status
    const setFormsData = props.setFormsData
    const [selectedFields , setSelectedFields] = useState({})
  

    useEffect(()=>{
        setFormsData(current=>{return{
          ...current , fieldsData:selectedFields
        }})
    },[selectedFields])







    return (  
<div className={`${styles.fieldsEdit} ${status==='active' && styles.active}`}>
     <h1>Fields</h1>

      <form className={styles.selectedFields} id='fieldsForm' >

        {Object.entries(selectedFields).map(([field,data])=>{
           return <LinkField data={{field:field,link:data}} key={field} setSelectedFields={setSelectedFields}/>
        })}


      </form>



    <div>

    <h3>Social</h3>

    <LinkFieldBtn   data={{icon:'',text:'Instagram' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Facebook' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Twitter' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'LinkedIn' }} setSelectedFields={setSelectedFields}/>

    <h3>Communication</h3>
    <LinkFieldBtn   data={{icon:'',text:'Telegram' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Whatsapp' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Email' }} setSelectedFields={setSelectedFields}/>
    <LinkFieldBtn   data={{icon:'',text:'Discord' }} setSelectedFields={setSelectedFields}/>




    </div>





</div>    
    );
}

export default FieldsCreateCard;