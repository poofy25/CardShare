
import styles from './navigation.module.css'
import { useNavigate } from 'react-router-dom';



function NavigationBar() {

    const navigateTo = useNavigate()

    return ( 

     <nav className={styles.navBar}>
     <button onClick={()=>{navigateTo('/contacts')}}>Contacts</button>
     <button onClick={()=>{navigateTo('/cards')}}>Cards</button>
     <button onClick={()=>{navigateTo('/profile')}}>Profile</button>

     </nav>



     );
}

export default NavigationBar;