import { objectRgba } from "./colorObjectsInterfaces";

function validateHexaString(stringHexa: string, hexRegex: RegExp) {
    return stringHexa.search(hexRegex);
}

/**
 *@param {String} hexa color as hex string (with alpha too)
 *@return {objectRgba} color as objectRgba
 */

export function hexaStringToRgbaObject (hexa: string): objectRgba {
    const hexRegex = /^#([\da-f]{3}){1,2}$/i;
    const hexaRegex = /^#([\da-f]{4}){1,2}$/i;
    let r = 0,
        b = 0,
        g = 0,
        a = 0;

    if (validateHexaString(hexa, hexRegex) !== -1) {
        r = Number("0x" + hexa[1] + hexa[2]);
        g = Number("0x" + hexa[3] + hexa[4]);
        b = Number("0x" + hexa[5] + hexa[6]);
        // a = (Number("0x" + hexa[7] + hexa[8]) * 100) / 255;
        a = 100;
    } else if (validateHexaString(hexa, hexaRegex) !== -1) {
        r = Number("0x" + hexa[1] + hexa[2]);
        g = Number("0x" + hexa[3] + hexa[4]);
        b = Number("0x" + hexa[5] + hexa[6]);
        a = 100;
    } else {
        return { r: 0, g: 0, b: 0, a: 100 };
    }
    return { r: r, g: g, b: b, a: a };
};
