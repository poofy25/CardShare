import styles from './createCard.module.css'



function CreateCardPage() {
    return ( 

     <div className={styles.createCard}>


        <h1>Create Your Card</h1>

       <form>
        Name
        <input/>
        Title
        <input/>
        Phone Number
        <input/>
        Email
        <input/>
        </form>

        <button className={styles.saveCardBtn}>Save Card</button>


     </div>


     );
}

export default CreateCardPage;