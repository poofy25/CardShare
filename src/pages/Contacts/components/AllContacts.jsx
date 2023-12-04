import styles from "./allContacts.module.css"

import { useEffect , useState } from "react";
import { useAuthState  } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection , query , getDocs , orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { auth } from "../../../firebase/firebase";

import MiniContact from "../../../components/MiniContact/MiniContact";


function AllContacts(props) {
    
    const [user , loading] = useAuthState(auth);
    const [contacts , setContacts] = useState([])

    

    useEffect(()=>{
        //Fetching all the contscts that matches the uid of the user from firestoree
        if(user && !loading){
            const q = query(collection(db, `usercontacts/${user.uid}/contacts`) ,orderBy("createdAt.formatted", 'desc'));

            async function getDocuments(){
                
                    const querySnapshot = await getDocs(q);
                    const allContacts = []
                    querySnapshot.forEach((doc) => {
                        allContacts.push({...doc.data(), id:doc.id})
                    });
                    
                    setContacts(allContacts)
            }
            getDocuments()
        }
    
    },[loading])

    useEffect(()=>{
        console.log(contacts)
    },[contacts])






    return ( 

        <section className={`${styles.allContacts}`}>

            <section>

            {contacts.map((contact)=>{

                return(
                   <MiniContact data={contact}/>
                )
            })}


            </section>





        </section>


     );
}

export default AllContacts;