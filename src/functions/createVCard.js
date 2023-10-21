
const vCardCode = {
    fullname:'\nFN:',
    phone:'\nTEL;TYPE=work,voice:',
    title:'\nTITLE:',
    company:'\nORG:',
    photo:'\nPHOTO;ENCODING=BASE64;TYPE=JPEG:',
    email:'\nEMAIL:',
    Instagram:'\nURL;TYPE=Instagram:',
    Facebook:'\nURL;TYPE=Facebook:',
    Twitter:'\nURL;TYPE=Twitter:',
    LinkedIn:'\nURL;TYPE=LinkedIn:',
    Telegram:'\nURL;TYPE=Telegram:',
    Whatsapp:'\nURL;TYPE=Whatsapp:',
    Discord:'\nURL;TYPE=Discord:',
    Github:'\nURL;TYPE=Github:'
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