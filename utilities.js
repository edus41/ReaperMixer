export const COLORS = {
    Black:"#000000",
    Grey10: "#101010",
    Grey15: "#151515",
    Grey20: "#202020",
    Grey30: "#303030",
    Grey40: "#404040",
    Grey50: "#505050",
    Grey60: "#606060",
    Grey70: "#707070",
    Grey80: "#808080",
    Grey90: "#909090",
    GreyAA: "#AAAAAA",
    GreyCC: "#CCCCCC",
    White: "#FFFFFF",
    Red: "#FF2000",
    Yellow: "#FFFF00",
    Orange:"#FF7000",
    Green: "#00FF60",
    Red50: "#FF200030",
    Red80: "#FF2000DD",
    Yellow50: "#FFFF0030",
    Green50: "#00FF6030"

}

export const IMG = {
    Alert: require("./assets/alert.png"),
    Fader: require("./assets/fader.png"),
    MuteFader: require("./assets/mutedFader.png"),
    FullScreen: require("./assets/logo.png"),
}

export const ORIENT_NUM = {
    0:"PORTRAIT_UP",
    1:"PORTRAIT_UP",
    2:"PORTRAIT_DOWN",
    3:"LANDSCAPE_LEFT",
    4:"LANDSCAPE_RIGHT",
}

export const ORIENTATION = {
    PORTRAIT:"PORTRAIT",
    LANDSCAPE:"LANDSCAPE"
}

export const manageReplay = (results) => {
    return results
        .split('\n')
        .map(line => line.split('\t'))
        .filter(tokens => tokens.length > 1)
}

export const intToHexColor = (integerColor) => {
    const red = (integerColor >> 16) & 0xFF
    const green = (integerColor >> 8) & 0xFF
    const blue = integerColor & 0xFF
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
}

export const getTextColor = (backgroundColor) => {
    const rgb = parseInt(backgroundColor.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
}

export const colorWithAlpha = (color, alpha) => {
    const red = color.substring(1, 3)
    const green = color.substring(3, 5)
    const blue = color.substring(5, 7)
    return `rgba(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)}, ${alpha})`
}

export const mkvolstr = (vol) => {
    var v = parseFloat(vol);
    if (v < 0.00000002980232) return "-inf dB";
    v = Math.log(v) * 8.68588963806;
    return v.toFixed(2) + " dB";
}

export const mkpanstr = (pan) => {
    if (Math.abs(pan) < 0.001) return "C";
    if (pan > 0) return (pan * 100).toFixed(0) + " L";
    return (pan * -100).toFixed(0) + " R";
}