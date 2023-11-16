import styles from "./allContacts.module.css"


function AllContacts(props) {
    const status = props.status
    return ( 

        <section className={`${styles.allContacts} ${status==='active' && styles.active}`}>
            <h1>AllContacts</h1>
        </section>


     );
}

export default AllContacts;