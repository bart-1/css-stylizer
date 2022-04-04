import { objectHexa } from "./colorObjectsInterfaces";

/**
 *@param {objectHexa} objectHexa color as objectRgba
 *@return {string} color as hex string (with alpha)
 */

export const hexaObjectToHexaString = (objectHexa: objectHexa): string => {
    const { hr, hg, hb, ha } = objectHexa;
    return `#${hr}${hg}${hb}${ha}`;
};
