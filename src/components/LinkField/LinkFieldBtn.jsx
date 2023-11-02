
import styles from './linkFieldBtn.module.css'
import fieldValues from '../../functions/fields'

function LinkFieldBtn(props) {


    const field = props.data.text
    const setSelectedFields = props.setSelectedFields



    return ( 

     <button className={styles.fieldBtn} onClick={()=>{


      setSelectedFields(current=>{
        return({...current , [field]:{link:''}})})
     }}>
       <img src={fieldValues[field].icon}/>
       {field}
     </button>




     );
}

export default LinkFieldBtn;