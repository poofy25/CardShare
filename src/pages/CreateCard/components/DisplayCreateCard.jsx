import styles from './displayCreateCard.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useState , useEffect} from 'react';


function DisplayCreateCard(props) {

    const status = props.status
    const setPicture = props.setPicture
    const picture = props.picture
    const [file, setFile] = useState(null);
    const [imageUrl , setImageUrl] = useState(null)
    const setImageUUID = props.setImageUUID
    const pictureUUID = uuidv4()

    const compUse = props.compUse
    const isEdit = compUse == 'edit'
    const cardDisplayData = props.cardDisplayData
    const editImgUrl = props.editImgUrl

useEffect(()=>{
    if(file){
        const newPictureUrl = []
        newPictureUrl.push(URL.createObjectURL(file))
        setImageUrl(newPictureUrl)
    }
},[file])

useEffect(()=>{
    if(imageUrl)setPicture(file)
},[imageUrl])

useEffect(()=>{
    if(imageUrl){ 
        console.log('set')
        setImageUUID({imageUUID:pictureUUID})}
},[picture])

useEffect(()=>{
    if(isEdit){
        setImageUUID({imageUUID:cardDisplayData.imageUUID})
    }
},[])


    


    return (  
<div className={`${styles.displayEdit} ${status==='active' && styles.active}`}>
    
    <form id='displayForm'>



    <h2>Profile Picture</h2>
   <label className={styles.uploadImageBtn}>
      <img src={imageUrl || editImgUrl} className={styles.profilePicture}/>
      <h1>+</h1>
      <input type="file" name="myImage" accept="image/*" onChange={(e)=>{setFile(e.target.files[0])}} hidden/>
   </label>
   
  

    </form>
</div>
    );
}

export default DisplayCreateCard;