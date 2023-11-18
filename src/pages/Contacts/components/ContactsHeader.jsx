import styles from './contactsHeader.module.css'
import exportIcon from '/src/assets/icons/exportIcon.png'

function ContactsHeader() {
    return ( 
        <header className={styles.header}>
            <p>Contacts</p>
            <button className={styles.exportBtn}><img src={exportIcon}/></button>
        </header>
     );
}

export default ContactsHeader;