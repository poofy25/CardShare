import { useEffect } from "react"
import styles from "./shareCard.module.css"

import QrCode from 'qrcodejs';


function ShareCardComponent(props) {

    const status = props.sharingComponentStatus
    const setStatus = props.setSharingComponentStatus
    const isActive = status.active === true
    const data = status.card
    console.log(status)
    

    useEffect(()=>{
    
        const qrCodeData = `https://share-card.netlify.app/viewcard/${data?.id}`;
        const matrix = QrCode.generate(qrCodeData);
        const uri = QrCode.render('svg-uri', matrix);
        document.getElementById('qrCodeImg').src = uri;
    
    },[])

    return ( 
        <div className={`${styles.shareCard} ${isActive && styles.active}`}>
            <section className={styles.shareCardSection}>



                <button className={styles.xBtn} onClick={()=>setStatus({active:false , card:null})}>X</button>



                <p className={styles.cardName}>Sharing {data?.cardData?.generalData?.cardname}</p>



                <div id="qrCode" className={styles.qrCode}>
                    <img id="qrCodeImg">

                    </img>
                </div>




                <button className={styles.copyLinkBtn}
                onClick={()=>{navigator.clipboard.writeText(`https://share-card.netlify.app/viewcard/${data?.id}`)}}
                >Copy Card Link</button>

            </section>
        </div>
     );
}

export default ShareCardComponent;