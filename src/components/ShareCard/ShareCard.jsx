import { useEffect } from "react"
import styles from "./shareCard.module.css"

import QrCode from 'qrcodejs';

import shareIcon from '/src/assets/icons/shareIcon.svg'
import copyIcon from '/src/assets/svgIcons/copy.svg'
import qrcodeIcon from '/src/assets/svgIcons/qrcode.svg'

function ShareCardComponent(props) {

    const status = props.sharingComponentStatus
    const setStatus = props.setSharingComponentStatus
    const isActive = status.active === true
    const data = status.card
    console.log(status , data)
    

    const copyLinkBtnClick = (e)=>{

        const button = e.currentTarget
        button.disabled = true;

        button.classList.add(styles.copiedAnimation);
        button.innerHTML = `<img src='${copyIcon}'/>Link copied!`
        console.log(e.target , e.currentTarget)
        navigator.clipboard.writeText(`https://share-card.netlify.app/viewcard/${data?.id}`)
        setTimeout(() => {
        button.disabled = false;
        button.innerHTML = `<img src='${copyIcon}'/>Copy Card link`
        button.classList.remove(styles.copiedAnimation);
        }, 2000);
    }

    const shareCardBtnClick = async () => {
        try {
          await navigator.share(
            {
                title: "CardShare profile",
                text: "I wanna share this CardShare profile link!",
                url:`https://share-card.netlify.app/viewcard/${data?.id}`,
              }
          );
          console.log('sharing')
        } catch (err) {
          console.log('cant share' , err)
        }
      };


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



                <p className={styles.cardName}>Sharing {data?.cardData?.generalData?.fullname}</p>



                <div id="qrCode" className={styles.qrCode}>
                    <img id="qrCodeImg">

                    </img>
                </div>




                <button className={styles.copyLinkBtn}
                    onClick={copyLinkBtnClick}
                >
                    <img src={copyIcon}/>Copy Card Link
                </button>

                <button className={styles.shareCardBtn}
                    onClick={shareCardBtnClick}
                >
                    <img src={shareIcon}/>Share Card
                </button>

                <a className={styles.downloadQRCode} href={document.getElementById('qrCodeImg')?.src} download="CardShareQRCode.png">
                <img src={qrcodeIcon}/>Download QR Code</a>

            </section>
        </div>
     );
}

export default ShareCardComponent;