import { ObjectHsla } from "./colorObjectsInterfaces";
import { hslaObjectToRgbaObject } from "./hslaObjectToRgbaObject";
import { rgbaObjectToHexaString } from "./rgbaObjectToHexaString";

/**
 *@param {ObjectHsla} colorHsla color as objectHsla
 *@return {string} color as hex string (with alpha)
 *@see /hslaObjectToRgbaObject()
 *@see /rgbaObjectToHexaString()
 */

export function hslaObjectToHexaString(colorHsla: ObjectHsla): string {
    const rgbaColor = hslaObjectToRgbaObject(colorHsla);
    return rgbaObjectToHexaString(rgbaColor);
}
