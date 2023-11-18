import { useEffect } from "react"
import styles from "./shareCard.module.css"

import QRCode from 'qrcode'



function ShareCardComponent(props) {

    const status = props.sharingComponentStatus
    const setStatus = props.setSharingComponentStatus
    const isActive = status.active === true
    const data = status.card
    console.log(status)
    

    useEffect(()=>{
        QRCode.toCanvas(document.getElementById('qrCodeCanvas') ,`https://share-card.netlify.app/viewcard/${data?.id}`, { errorCorrectionLevel: 'H' }, function (err, canvas) {
            if (err) throw err
          })
    },[])

    return ( 
        <div className={`${styles.shareCard} ${isActive && styles.active}`}>
            <section className={styles.shareCardSection}>



                <button className={styles.xBtn} onClick={()=>setStatus({active:false , card:null})}>X</button>



                <p className={styles.cardName}>Sharing {data?.cardData?.generalData?.cardname}</p>



                <div id="qrCode" className={styles.qrCode}>
                    <canvas id="qrCodeCanvas">

                    </canvas>
                </div>




                <button className={styles.copyLinkBtn}
                onClick={()=>{navigator.clipboard.writeText(`https://share-card.netlify.app/viewcard/${data?.id}`)}}
                >Copy Card Link</button>

            </section>
        </div>
     );
}

export default ShareCardComponent;