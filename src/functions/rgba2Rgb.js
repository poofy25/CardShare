


function rgba2rgb(RGB_background, RGBA_color)
{
    const rgbValues = (RGB_background).substring(4, (RGB_background).length-1).replace(/ /g, '').split(',');
    const rgbaValues = (RGBA_color).substring(4, (RGBA_color).length-1).replace(/ /g, '').replace('(','').split(',');
  
    const alpha = Number(rgbaValues[3])
  
    const rgb = `rgb(${(1 - alpha) * Number(rgbValues[0]) + alpha * Number(rgbaValues[0])},${(1 - alpha) * Number(rgbValues[1]) + alpha * Number(rgbaValues[1])},${(1 - alpha) * Number(rgbValues[2]) + alpha * Number(rgbaValues[2])})`
    return rgb;

}

export default rgba2rgb