import styles from './generalCreateCard.module.css'



function GeneralCreateCard(props) {

   const status = props.status



    return (  
<div className={`${styles.generalEdit} ${status==='active' && styles.active}`}>
     <h1>General</h1>

     <form id='generalForm' >




            <label>
               Card Name *
               <input name="cardname" type="text"  required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <label>
               Fullname *
               <input name="fullname" type="text" required onInvalid={()=>props.changeActiveComponent(props.cardNavComponents.general , null , document.getElementById('generalCreateBtn') )} />
            </label>

            <label>
               Phone Number
               <input name="phone" type="number" />
            </label>

            <label>
               Title
               <input name="title" type="text"  />
            </label>

            <label>
               Company
               <input name="company" type="text" />
            </label>

            <label>
               Headline
               <input name="headline" type="text"/>
            </label>

     </form>




     </div>
    );
}

export default GeneralCreateCard;