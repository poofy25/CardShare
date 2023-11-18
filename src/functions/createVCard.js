
const vCardCode = {
    fullname:'\nFN:',
    name:'\nN:',
    phone:'\nTEL;TYPE=WORK:',
    title:'\nTITLE:',
    company:'\nORG:',
    headline:'\nNOTE:',
    photo:'\nPHOTO;TYPE=JPEG;ENCODING=B:',
    Email:'\nEMAIL:',
    Instagram:'\nURL;TYPE=INSTAGRAM:',
    TikTok:'\nURL;TYPE=TIKTOK:',
    Website:'\nURL;TYPE=WEBSITE:',
    Facebook:'\nURL;TYPE=FACEBOOK:',
    Twitter:'\nURL;TYPE=TWITTER:',
    LinkedIn:'\nURL;TYPE=LINKEDIN:',
    Telegram:'\nURL;TYPE=TELEGRAM:',
    Whatsapp:'\nURL;TYPE=WHATSAPP:',
    Discord:'\nURL;TYPE=DISCORD:',
    Github:'\nURL;TYPE=GITHUB:'
}





const createVCard = (data , imgBase64)=>{



console.log(data)
const generalData = data.generalData
const fieldsData = data.fieldsData





    var vcard = "BEGIN:VCARD\nVERSION:3.0"
    


    {Object.entries(generalData).map(([key,value])=>{
        if(vCardCode.hasOwnProperty(key)){
            vcard = vcard + vCardCode[key] + value
        }
     })}

     vcard = vcard + vCardCode.name + generalData.fullname
     {Object.entries(fieldsData).map(([key,value])=>{
        if(vCardCode.hasOwnProperty(key)){
            console.log(key,value)
            vcard = vcard + vCardCode[key] + value.link
        }
     })}
    
     vcard = vcard + vCardCode.photo + imgBase64
     vcard = vcard + "\nEND:VCARD";

   return vcard
}

export default createVCard