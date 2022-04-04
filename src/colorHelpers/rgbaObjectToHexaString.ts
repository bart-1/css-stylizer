import { objectRgba } from "./colorObjectsInterfaces";

/**
 *@param {objectRgba} colorRgba color as objectRgba
 *@return {string} color as hex string (with alpha)
 */

export function rgbaObjectToHexaString(colorRgba: objectRgba): string {
    const { r, g, b, a } = colorRgba;

    function prepareHex(n: number) {
        return n.toString(16).padStart(2, "0").toUpperCase();
    }

    return `#${prepareHex(r)}${prepareHex(g)}${prepareHex(b)}${prepareHex(
        Math.round((a * 255) / 100)
    )}`;
}
