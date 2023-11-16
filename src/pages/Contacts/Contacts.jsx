import styles from "./contacts.module.css"
import AllContacts from "./components/AllContacts";
import ContactRequests from "./components/ContactRequests";
import { useState } from "react";


const navComponents = {
    allContacts:(<AllContacts/>),
    contactrequests:(<ContactRequests/>),
   
 }





function ContactsPage() {

    const [activeNavComponent , setActiveNavComponent] = useState(navComponents.allContacts)
    const changeActiveComponent = (component)=>{
       //changes active component
       if (component !== activeNavComponent){
          setActiveNavComponent(component)
        }
     }


    return ( 
        <h1>
            CONTACTS PAGE
            <div>
                <button onClick={(e)=>changeActiveComponent(navComponents.allContacts)}>Contacts</button>
                <button onClick={(e)=>changeActiveComponent(navComponents.contactrequests)}>Requests</button>
            </div>

            <>
            <AllContacts
               status={activeNavComponent.type.name === navComponents.allContacts.type.name ? 'active' : 'inactive'}
            />
            <ContactRequests  
               status={activeNavComponent.type.name === navComponents.contactrequests.type.name ? 'active' : 'inactive'}               
            />
          </>


        </h1>
     );
}

export default ContactsPage;