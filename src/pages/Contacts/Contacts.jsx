import styles from "./contacts.module.css"
import AllContacts from "./components/AllContacts";
import ContactRequests from "./components/ContactRequests";
import ContactsHeader from "./components/ContactsHeader";
import SignedOutComponent from "../../components/SignedOut/SignedOut";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";


import requestIcon from '/src/assets/icons/requestIcon.png'

const navComponents = {
    allContacts:(<AllContacts/>),
    contactrequests:(<ContactRequests/>),
   
 }





function ContactsPage() {



    const [user , loading] = useAuthState(auth);
    const [activeNavComponent , setActiveNavComponent] = useState(navComponents.allContacts)
    const changeActiveComponent = (component)=>{
       //changes active component
       if (component !== activeNavComponent){
          setActiveNavComponent(component)
        }
     }


    return ( 
        <section className={styles.contactsPage}>
         {(!user && !loading) ? <SignedOutComponent/> :
         <>
               <ContactsHeader/>
               <section className={styles.searchSection}>
                  <input type="text" placeholder="Search names, companies and more..."/>
                  <button onClick={(e)=>changeActiveComponent(navComponents.contactrequests)}><img src={requestIcon}/></button>
               </section>

               <>
                  <AllContacts
                     status={activeNavComponent.type.name === navComponents.allContacts.type.name ? 'active' : 'inactive'}
                  />
                  <ContactRequests  
                     status={activeNavComponent.type.name === navComponents.contactrequests.type.name ? 'active' : 'inactive'}               
                  />
               </>
          </>
         }
        </section>
     );
}

export default ContactsPage;