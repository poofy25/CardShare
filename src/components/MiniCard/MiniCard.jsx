import styles from './miniCard.module.css'
import { useNavigate } from 'react-router-dom';

function MiniCardComponent(props) {

    const navigateTo = useNavigate()
    const setSelectedCard = props.setSelectedCard
    const data = props.data
    const cardID = data.id
    console.log(data)
    

  

    return ( 
<div className={styles.miniCard} onClick={()=>{setSelectedCard(current=>{return{active:true , data:data , id:cardID }})}}>
      <h3>{data.cardData.generalData.cardname}</h3>
      </div>
     );
}

export default MiniCardComponent;