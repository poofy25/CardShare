
import styles from './miniCard.module.css'


function MiniCardComponent(props) {

    const data = props.data

    return ( 
<div className={styles.miniCard}>
      <h2>{data.Name}</h2>
      <h3>{data.Title}</h3>
      <h4>{data.PhoneNumber}</h4>
      <h5>{data.Email}</h5>




      </div>
     );
}

export default MiniCardComponent;