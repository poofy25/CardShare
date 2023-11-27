import getContrast from 'get-contrast'
import rgba2rgb from './rgba2Rgb'


const createColorPallete = (defaultColor)=>{

    const colorPallete = {
        color:defaultColor,
        lighterColor:null,
        darkerColor:null,
        backgroundLightColor:null,
        textColor:null,
        textLightColor:'rgba(255,255,255,0.8)',
        textDarkColor:'rgba(0,0,0,0.8)',
        colorValues:[]
    }

    const isAccessible = getContrast.isAccessible(defaultColor , 'rgb(255,255,255)')

    const crementValue = 30

    const colorValues = (defaultColor).substring(4, (defaultColor).length-1).replace(/ /g, '').split(',');

    const lighterColor = `rgb(${Number(colorValues[0]) + crementValue},${Number(colorValues[1]) + crementValue},${Number(colorValues[2]) + crementValue})`

    const darkerColor = `rgb(${Number(colorValues[0]) - crementValue},${Number(colorValues[1]) - crementValue},${Number(colorValues[2]) - crementValue})`

    const backgroundLightColor = `rgba(${Number(colorValues[0])},${Number(colorValues[1])},${Number(colorValues[2])},0.1)`

    if(isAccessible){
        colorPallete.textColor = 'rgb(255,255,255)'
    }else{
        colorPallete.textColor = 'rgb(0,0,0)'
    }
   
    colorPallete.lighterColor = lighterColor
    colorPallete.darkerColor = darkerColor
    colorPallete.backgroundLightColor = rgba2rgb('rgb(255,255,255)' , backgroundLightColor)
    colorPallete.colorValues = colorValues


    console.log(colorPallete)
    return colorPallete
}



export default createColorPallete