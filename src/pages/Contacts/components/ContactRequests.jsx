import styles from "./contactRequests.module.css"
import { useEffect , useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection , query , where , getDocs , orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { auth } from "../../../firebase/firebase";

import RequestedContact from "../../../components/RequestedContact/RequestedContact";

function ContactRequests(props) {


    const status = props.status


    const [user , loading] = useAuthState(auth);
    const [requests , setRequests] = useState([])

    

    useEffect(()=>{
        //Fetching all the requests that matches the uid of the user from firestoree
        if(user && !loading){
            const q = query(collection(db, "contactsrequests") ,orderBy("createdAt.formatted", 'desc'), where("userId", "==", user.uid));

            async function getDocuments(){
                
                    const querySnapshot = await getDocs(q);
                    const allRequests = []
                    querySnapshot.forEach((doc) => {
                        allRequests.push({...doc.data(), id:doc.id})
                    });
                    
                    setRequests(allRequests)
            }
            getDocuments()
        }
    
    },[loading])

    useEffect(()=>{
        console.log(requests)
    },[requests])

    useEffect(()=>{
        console.log(status)
    },[status])








    return ( 

        <section className={`${styles.contactRequests} ${status===true && styles.active}`}>
            <header>
                <h1>REQUESTS</h1>
                <button onClick={(e)=>{props.setStatus(false)}}>x</button>
            </header> 
               
            <section>

            {requests.map((request)=>{
                const data = request
                console.log(data)
                return(
                    <RequestedContact data={data} setRequests={setRequests} key={data.id} user={user}/>
                )
            })}


            </section>


        </section>


     );
}

export default ContactRequests;