
const vCardCode = {
    fullname:'\nFN:',
    name:'\nN:',
    phone:'\nTEL;TYPE=work,voice:',
    title:'\nTITLE:',
    company:'\nORG:',
    headline:'\nNOTE:',
    photo:'\nPHOTO;ENCODING=BASE64;TYPE=JPEG:',
    Email:'\nEMAIL:',
    Instagram:'\nURL;Instagram=Instagram:',
    TikTok:'\nURL;TikTok=TikTok:',
    Website:'\nURL;Website=Website:',
    Facebook:'\nURL;Facebook=Facebook:',
    Twitter:'\nURL;Twitter=Twitter:',
    LinkedIn:'\nURL;LinkedIn=LinkedIn:',
    Telegram:'\nURL;Telegram=Telegram:',
    Whatsapp:'\nURL;Whatsapp=Whatsapp:',
    Discord:'\nURL;Discord=Discord:',
    Github:'\nURL;Github=Github:'
}





const createVCard = (data , imgBase64)=>{



console.log(data)
const generalData = data.generalData
const fieldsData = data.fieldsData





    var vcard = "BEGIN:VCARD"
    


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