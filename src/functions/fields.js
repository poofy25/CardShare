import phoneIcon from '/src/assets/icons/phoneIcon.png'
import emailIcon from '/src/assets/icons/emailIcon.png'
import websiteIcon from '/src/assets/icons/websiteIcon.png'
import telegramIcon from '/src/assets/icons/telegramIcon.png'
import facebookIcon from '/src/assets/icons/facebookIcon.png'
import instagramIcon from '/src/assets/icons/instagramIcon.png'
import githubIcon from '/src/assets/icons/githubIcon.png'
import linkedInIcon from '/src/assets/icons/linkedInIcon.png'
import tikTokIcon from '/src/assets/icons/tikTokIcon.png'
import twitterIcon from '/src/assets/icons/twitterIcon.png'
import discordIcon from '/src/assets/icons/discordIcon.png'
import whatsappIcon from '/src/assets/icons/whatsappIcon.png'

const fieldValues = {

   Email:{
    icon:emailIcon,
    defaultLink:''
   },
   Instagram:{
    icon:instagramIcon,
    defaultLink:'https://www.instagram.com/'
   },
   Facebook:{
    icon:facebookIcon,
    defaultLink:'https://www.facebook.com/'
   },
   Twitter:{
    icon:twitterIcon,
    defaultLink:'https://www.twitter.com/'
   },
   LinkedIn:{
    icon:linkedInIcon,
    defaultLink:' https://www.linkedin.com/in/'
   },
   Github:{
    icon:githubIcon,
    defaultLink:'https://github.com/'
   },
   Telegram:{
    icon:telegramIcon,
    defaultLink:'https://t.me/'
   },
   Discord:{
    icon:discordIcon,
    defaultLink:'https://discord.com/'
   },
   Whatsapp:{
    icon:whatsappIcon,
    defaultLink:'https://wa.me/'
   },
   Website:{
    icon:websiteIcon,
    defaultLink:'https://'
   },
   TikTok:{
    icon:tikTokIcon,
    defaultLink:'https://www.tiktok.com/@'
   },
   

}

export default fieldValues;


const saveBtn = document.getElementById('saveBtn')
console.log('IT WORKS !!!!' , saveBtn)