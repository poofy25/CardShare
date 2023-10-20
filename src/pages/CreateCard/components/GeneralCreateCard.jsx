import styles from './generalCreateCard.module.css'
import { useState , useEffect} from 'react'


function GeneralCreateCard(props) {

   const status = props.status
   const setFormsData = props.setFormsData

   const onChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
      if(value !== ''){
         setFormsData(current=>{return{...current , generalData:{...current.generalData , [name]:value}}})
      }else{
         setFormsData(current => {
            // remove cost key from object
            const {[current.generalData]:value ,  ...other} = current;
            const {[name]:value2 , ...other2} = current.generalData
            const concData = {...other , generalData:{...other2}}
            return concData;
         })
      }
   }





    return (  
<div className={`${styles.generalEdit} ${status==='active' && styles.active}`}>
     <h1>General</h1>

     <form id='generalForm' >




            <label>
               Card Name
               <input name="cardname" onChange={onChange}/>
            </label>

            <label>
               Fullname
               <input name="fullname" onChange={onChange}/>
            </label>

            <label>
               Title
               <input name="title" onChange={onChange}/>
            </label>

            <label>
               Company
               <input name="company" onChange={onChange}/>
            </label>

            <label>
               Headline
               <input name="headline" onChange={onChange}/>
            </label>

     </form>




     </div>
    );
}

export default GeneralCreateCard;