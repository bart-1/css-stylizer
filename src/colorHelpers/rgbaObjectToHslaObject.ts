import { objectHsla, objectRgba } from "./colorObjectsInterfaces";

/**
 *
 *@param {objectRgba} objectRgba color as objectRgba
 *@return {objectHsla} color as objectHsla
 */

export const rgbaObjectToHslaObject = (objectRgba: objectRgba): objectHsla => {
    let { r, g, b, a } = objectRgba;

    r /= 255;
    g /= 255;
    b /= 255;

    const cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin;

    let H = 0,
        L = ((cMax + cMin) / 2) * 100,
        S = 0;

    switch (true) {
        case delta === 0:
            H = 0;
            break;
        case cMax === r:
            H = Math.round(60 * (((g - b) / delta) % 6));
            break;
        case cMax === g:
            H = Math.round(60 * ((b - r) / delta + 2));
            break;
        case cMax === b:
            H = Math.round(60 * ((r - g) / delta + 4));
            break;
    }

    delta === 0
        ? (S = 0)
        : (S = (delta / (1 - Math.abs((2 * L) / 100 - 1))) * 100);

    return { h: H, s: Math.round(S), l: Math.round(L), a: a };
};
