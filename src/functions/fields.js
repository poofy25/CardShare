import phoneIcon from '/src/assets/svgIcons/phone.svg'
import gmailIcon from '/src/assets/svgIcons/gmail.svg'
import websiteIcon from '/src/assets/svgIcons/website.svg'
import telegramIcon from '/src/assets/svgIcons/telegram.svg'
import facebookIcon from '/src/assets/svgIcons/facebook.svg'
import instagramIcon from '/src/assets/svgIcons/instagram.svg'
import githubIcon from '/src/assets/svgIcons/github.svg'
import linkedInIcon from '/src/assets/svgIcons/linkedin.svg'
import tikTokIcon from '/src/assets/svgIcons/tiktok.svg'
import twitterIcon from '/src/assets/svgIcons/twitter.svg'
import discordIcon from '/src/assets/svgIcons/discord.svg'


const fieldValues = {

   Email:{
    icon:gmailIcon,
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