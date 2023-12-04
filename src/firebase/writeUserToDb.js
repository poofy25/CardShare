import { doc , setDoc} from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from "firebase/firestore";

function writeUserToDb(user) {
    if(user){
        async function onLogIn (){
            const userRef = doc(db , `users/${user.uid}`);
            async function writeData(){
                const docData = {
                    uid: user.uid,
                    displayName:user.displayName,
                    email:user.email,
                    emailVerified:user.emailVerified,
                    phonoNumber:user.phoneNumber,
                    photoUrl:user.photoURL,
                    provider:user.providerData[0].providerId,
                    updatedAt:serverTimestamp(),
                };
                try {
                    await setDoc(userRef , docData , {merge:false}).catch((error)=>console.log(error))
                    console.log("Loged in and sent data to db" , docData)
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            await writeData()
        };

        onLogIn()
    }
    return 'error'
   
}





export default writeUserToDb;