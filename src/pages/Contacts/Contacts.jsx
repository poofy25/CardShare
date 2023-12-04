import styles from "./contacts.module.css"
import AllContacts from "./components/AllContacts";
import ContactRequests from "./components/ContactRequests";
import ContactsHeader from "./components/ContactsHeader";
import SignedOutComponent from "../../components/SignedOut/SignedOut";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";


import requestIcon from '/src/assets/icons/requestIcon.png'

function ContactsPage() {



    const [user , loading] = useAuthState(auth);
    const [contactRequestsStatus , setContactRequestsStatus] = useState(false)


    return ( 
        <section className={styles.contactsPage}>
         {(!user && !loading) ? <SignedOutComponent/> :
         <>
               <ContactsHeader/>
               <section className={styles.searchSection}>
                  <input type="text" placeholder="Search names, companies and more..."/>
                  <button onClick={(e)=>setContactRequestsStatus(true)}><img src={requestIcon}/></button>
               </section>

               <>
                  <AllContacts contactRequestsStatus={contactRequestsStatus}/>
                  <ContactRequests  
                     status={contactRequestsStatus} setStatus={setContactRequestsStatus}              
                  />
               </>
          </>
         }
        </section>
     );
}

export default ContactsPage;