import styles from './generalCreateCard.module.css'



function GeneralCreateCard(props) {

   const status = props.status
   const compUse = props.compUse
   const isEdit = compUse == 'edit'
   const cardGeneralData = props.cardGeneralData


   const onClearField = (e)=>{
      e.target.nextElementSibling.value = ''

   }



    return (  
<div className={`${styles.generalEdit} ${status==='active' && styles.active}`}>

     <form id='generalForm' >


            <span className={styles.fieldHeader}>Card Name</span>

            <label>
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="cardname"  placeholder='Enter Card Name' type="text" defaultValue={isEdit ? cardGeneralData.cardname : 'New Card'}  required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <span className={styles.fieldHeader}>Personal</span>

            <label>
               Fullname *
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="fullname" type="text" defaultValue={isEdit ? cardGeneralData.fullname : ''} required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <label>
               Phone Number
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="phone" type="tel" defaultValue={isEdit ? cardGeneralData.phone : ''}/>
            </label>

            <span className={styles.fieldHeader}>Affiliate</span>

            <label>
               Title
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="title" type="text"  defaultValue={isEdit ? cardGeneralData.title : ''} />
            </label>

            <label>
               Company
               <button type='button' className={styles.clearFieldBtn} onClick={onClearField}>X</button>
               <input name="company" type="text" defaultValue={isEdit ? cardGeneralData.company : ''}/>
            </label>

            <label>
               Notes
               <textarea name="headline" defaultValue={isEdit ? cardGeneralData.headline : ''}/>
            </label>

     </form>




     </div>
    );
}

export default GeneralCreateCard;