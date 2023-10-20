const createVCard = (data)=>{
  
    const personalData = {
        name:'',
        phone:'',
        email:'',
        adress:'',
        website:'',
        link:''
    }
    const socialData = {

        instagram:'',
        facebook:'',
        linkedin:'',
        telegram:'',
        twitter:'',
        tiktok:'',
        spanchat:'',
        whatsapp:'',
        github:''

    }








    var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:"
    + contactData.name + 
    "\nTEL;TYPE=work,voice:" + contactData.number 
    + "\nEMAIL:" + contactData.email 
    + `\nPHOTO;ENCODING=BASE64;TYPE=JPEG:${imgBase64}`
    + `\nTITLE:${contactData.title}`
    + "\nEND:VCARD";




}

export default createVCard