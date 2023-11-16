import styles from "./contactRequests.module.css"
import { useEffect , useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection , query , where , getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { auth } from "../../../firebase/firebase";

function ContactRequests(props) {


    const status = props.status


    const [user , loading] = useAuthState(auth);
    const [requests , setRequests] = useState([])

    

    useEffect(()=>{
        //Fetching all the cards that matches the uid of the user from firestoree
        if(user && !loading){
            const q = query(collection(db, "contactsrequests"), where("userId", "==", user.uid));

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









    return ( 

        <section className={`${styles.contactRequests} ${status==='active' && styles.active}`}>
            <h1>REQUESTS</h1>

            <section>

            {requests.map((request)=>{
                const data = request.requestData
                return(
                    <div>
                        <h4>{data.fullname}</h4>
                        <h5>{data.title}</h5>
                        <h6>{data.email}</h6>
                        <h6>{data.phonenumber}</h6>
                        <button>Accept</button>
                        <button>Deny</button>
                    </div>
                )
            })}


            </section>


        </section>


     );
}

export default ContactRequests;