import styles from './miniContact.module.css'
import { doc , deleteDoc , addDoc , collection} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { serverTimestamp } from 'firebase/firestore';

import defaultPfp from '/src/assets/svgIcons/defaultpfp.svg'
import addContactIcon from '/src/assets/svgIcons/addcontact.svg'
import moreIcon from '/src/assets/svgIcons/more.svg'

function MiniContact({data}) {

    console.log(data)
    const contactData = data.contactData

    return ( 
        <div className={styles.contact}>
            <img src={defaultPfp}/>
            <span className={styles.contactName}>
            <h4>{contactData.fullname}</h4>
            {contactData.title && <h5>{contactData.title}</h5>}
            </span>
            <button><img src={addContactIcon}/></button>
            <button><img src={moreIcon}/></button>

        </div>
     );
}

export default MiniContact;