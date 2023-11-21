import { useEffect } from "react"
import styles from "./shareCard.module.css"

import QrCode from 'qrcodejs';


function ShareCardComponent(props) {

    const status = props.sharingComponentStatus
    const setStatus = props.setSharingComponentStatus
    const isActive = status.active === true
    const data = status.card
    console.log(status , data)
    

    const copyLinkBtnClick = (e)=>{

        const button = e.target
        button.disabled = true;

        button.classList.add(styles.copiedAnimation);
         e.target.textContent = 'Link Copied!'
        navigator.clipboard.writeText(`https://share-card.netlify.app/viewcard/${data?.id}`)
        setTimeout(() => {
        button.disabled = false;
         e.target.textContent = 'Copy Card Link'
        button.classList.remove(styles.copiedAnimation);
        }, 2000);
    }









    useEffect(()=>{
        console.log(data?.id)
        const qrCodeData = `https://share-card.netlify.app/viewcard/${data?.id}`;
        const matrix = QrCode.generate(qrCodeData);
        const uri = QrCode.render('svg-uri', matrix);
        document.getElementById('qrCodeImg').src = uri;
    
    },[status])

    return ( 
        <div className={`${styles.shareCard} ${isActive && styles.active}`} onClick={(e)=>{if(e.target === e.currentTarget){setStatus({active:false , card:null})}}}>
            <section className={styles.shareCardSection}>



                <button className={styles.xBtn} onClick={()=>setStatus({active:false , card:null})}>X</button>



                <p className={styles.cardName}>Sharing {data?.cardData?.generalData?.cardname}</p>



                <div id="qrCode" className={styles.qrCode}>
                    <img id="qrCodeImg">

                    </img>
                </div>




                <button className={styles.copyLinkBtn}
                    onClick={copyLinkBtnClick}
                >
                    Copy Card Link
                </button>

                <a className={styles.downloadQRCode} href={document.getElementById('qrCodeImg')?.src} download="CardShareQRCode.svg">Download QR Code</a>

            </section>
        </div>
     );
}

export default ShareCardComponent;