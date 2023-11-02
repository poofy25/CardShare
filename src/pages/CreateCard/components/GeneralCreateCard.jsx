import styles from './generalCreateCard.module.css'



function GeneralCreateCard(props) {

   const status = props.status


   const onClearField = (e)=>{
      e.target.nextElementSibling.value = ''

   }



    return (  
<div className={`${styles.generalEdit} ${status==='active' && styles.active}`}>

     <form id='generalForm' >


            <span className={styles.fieldHeader}>Card Name</span>

            <label>
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="cardname" placeholder='Enter Card Name' type="text" defaultValue='New Card'  required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <span className={styles.fieldHeader}>Personal</span>

            <label>
               Fullname *
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="fullname" type="text" required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <label>
               Phone Number
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="phone" type="tel" />
            </label>

            <span className={styles.fieldHeader}>Affiliate</span>

            <label>
               Title
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="title" type="text"  />
            </label>

            <label>
               Company
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="company" type="text" />
            </label>

            <label>
               Notes
               <textarea name="headline" />
            </label>

     </form>




     </div>
    );
}

export default GeneralCreateCard;