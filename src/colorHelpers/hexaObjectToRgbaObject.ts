import { ObjectHexa, ObjectRgba } from "./colorObjectsInterfaces";

export function validateHexaString(stringHexa: string, hexRegex: RegExp) {
  return stringHexa.search(hexRegex);
}

/**
 *@param {ObjectHexa} hexa - color as objectHexa
 *@return {ObjectRgba} color as objectRgba
 */

export function hexaObjectToRgbaObject(hexa: ObjectHexa): ObjectRgba {
  const hexRegex = /^#([\da-f]{3}){1,2}$/i;
  let r = 0,
    b = 0,
    g = 0,
    a = 100;

  if (validateHexaString(hexa.hex, hexRegex) !== -1) {
    r = Number("0x" + hexa.hex[1] + hexa.hex[2]);
    g = Number("0x" + hexa.hex[3] + hexa.hex[4]);
    b = Number("0x" + hexa.hex[5] + hexa.hex[6]);
    a = hexa.a;
  }
  return { r: r, g: g, b: b, a: a };
}
