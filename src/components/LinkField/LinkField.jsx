import styles from './linkField.module.css'




function LinkField(props) {


   // const link = props.data.link
    const field = props.data.field

    const setSelectedFields = props.setSelectedFields

    const onInputChanged = (e)=>{

      setSelectedFields(current=>{return{
        ...current,[field]:{...current[field] , link:e.target.value}
      }})


    }



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
      
        <input onChange={onInputChanged}></input>

    </label>



     );
}

export default LinkField;