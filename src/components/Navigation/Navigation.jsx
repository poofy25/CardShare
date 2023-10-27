
import styles from './navigation.module.css'
import { useNavigate } from 'react-router-dom';



function NavigationBar() {

    const navigateTo = useNavigate()

    return ( 

     <div className={styles.navBar}>

     <button onClick={()=>{navigateTo('/cards')}}>Cards</button>
     <button onClick={()=>{navigateTo('/profile')}}>Profile</button>

     </div>



     );
}

export default NavigationBar;