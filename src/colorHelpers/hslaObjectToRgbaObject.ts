import { objectHsla, objectRgba } from "./colorObjectsInterfaces";

function validateColorParameters(
    param: number,
    min: number,
    max: number
): number {
    if (min > param) return (param = min);
    else if (param > max) return (param = max);
    else return param;
}

/**
 *
 *@param {objectHsla} colorHsla color as objectHsla
 *@return {objectRgba} color as RGBA object
 */

export function hslaObjectToRgbaObject(colorHsla: objectHsla): objectRgba {
    let { h, s, l, a } = colorHsla;

    if (0 > h || h >= 360) h = Math.abs(h) % 360;

    s = validateColorParameters(s, 0, 100);
    l = validateColorParameters(l, 0, 100);
    a = validateColorParameters(a, 0, 100);

    let c = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l / 100 - c / 2;

    function calcFinalRgb(value: number) {
        return Math.round((value + m) * 255);
    }

    let rgbaColor = { r: 0, g: 0, b: 0, a: 0 };

    switch (true) {
        case 0 <= h && h < 60:
            rgbaColor = {
                r: calcFinalRgb(c),
                g: calcFinalRgb(x),
                b: calcFinalRgb(0),
                a: a,
            };
            break;
        case 60 <= h && h < 120:
            rgbaColor = {
                r: calcFinalRgb(x),
                g: calcFinalRgb(c),
                b: calcFinalRgb(0),
                a: a,
            };
            break;
        case 120 <= h && h < 180:
            rgbaColor = {
                r: calcFinalRgb(0),
                g: calcFinalRgb(c),
                b: calcFinalRgb(x),
                a: a,
            };
            break;
        case 180 <= h && h < 240:
            rgbaColor = {
                r: calcFinalRgb(0),
                g: calcFinalRgb(x),
                b: calcFinalRgb(c),
                a: a,
            };
            break;
        case 240 <= h && h < 300:
            rgbaColor = {
                r: calcFinalRgb(x),
                g: calcFinalRgb(0),
                b: calcFinalRgb(c),
                a: a,
            };
            break;
        case 300 <= h && h < 360:
            rgbaColor = {
                r: calcFinalRgb(c),
                g: calcFinalRgb(0),
                b: calcFinalRgb(x),
                a: a,
            };
            break;
    }
    return rgbaColor;
}
