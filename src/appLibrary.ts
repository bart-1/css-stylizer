import {
  ObjectHexa,
  ObjectHsla,
  ObjectRgba,
} from "./colorHelpers/colorObjectsInterfaces";
import { hexaObjectToRgbaObject } from "./colorHelpers/hexaObjectToRgbaObject";
import { hslaObjectToRgbaObject } from "./colorHelpers/hslaObjectToRgbaObject";

/**types & interfaces */
export type InputList = {
  id: number;
  name: string;
  min: number;
  max: number;
  color: string;
}[];

export type ColorModeType = "rgba" | "hsla" | "hexa";
export type OutputColorData = ObjectHexa | ObjectHsla | ObjectRgba | string;

export type CSSTargets = "color" | "background-color";

export type SamplesSetup = {
  id: number;
  CSSTargets: CSSTargets[];
  colorModel: ColorModeType;
  initialColorValues: { [key: string]: ObjectRgba | ObjectHsla | ObjectHexa };
};

export type ControllerDataPack = {
  target: string;
  value: ObjectRgba;
  otherParams?: { colorMode: ColorModeType };
};
/** initial values */
export const samplesSetup: SamplesSetup[] = [
  {
    id: 1,
    CSSTargets: ["color", "background-color"],
    colorModel: "rgba",
    initialColorValues: {
      color: { r: 0, g: 0, b: 0, a: 100 },
      background: { r: 255, g: 255, b: 255, a: 100 },
    },
  },
  {
    id: 2,
    CSSTargets: ["color", "background-color"],
    colorModel: "hsla",
    initialColorValues: {
      color: { h: 0, s: 0, l: 0, a: 100 },
      background: { h: 0, s: 0, l: 100, a: 100 },
    },
  },
  {
    id: 3,
    CSSTargets: ["color", "background-color"],
    colorModel: "hexa",
    initialColorValues: {
      color: {  hex: "#000000", a:100 },
      background: { hex: "#FFFFFF", a:100 },
    },
  },
];

export const initialControllerDataPack: ControllerDataPack[] = [
  {
    target: "color",
    value: { r: 0, g: 0, b: 0, a: 100 },
    otherParams: { colorMode: "rgba" },
  },
  {
    target: "background-color",
    value: { r: 255, g: 255, b: 255, a: 100 },
    otherParams: { colorMode: "rgba" },
  },
];

export const inputsList = [
  { id: 0, name: "r", min: 0, max: 255, color: "rgb" },
  { id: 1, name: "g", min: 0, max: 255, color: "rgb" },
  { id: 2, name: "b", min: 0, max: 255, color: "rgb" },
  { id: 3, name: "h", min: 0, max: 359, color: "hsl" },
  { id: 4, name: "s", min: 0, max: 100, color: "hsl" },
  { id: 5, name: "l", min: 0, max: 100, color: "hsl" },
  { id: 6, name: "a", min: 0, max: 100, color: "a" },
];

/** helper functions */

export function isProperObjectType<T extends object>(
  object: object,
  pattern: Array<string>
): object is T {
  let countHits = 0;
  Object.keys(object).map((key) => {
    if (pattern.includes(key)) countHits += 1;
  });

  if (countHits === pattern.length) return true;
  else return false;
}

export function isOfUnionType<T extends string>(
  value: string,
  unionArray: string[]
): value is T {
  if (unionArray.includes(value)) return true;
  else return false;
}
export function isOfConcreteObjectType<T extends object>(
  object: object,
  keysArray: string[]
): object is T {
  const test = Object.keys(object).filter((key) => keysArray.includes(key));

  if (keysArray.length === test.length) return true;
  else return false;
}

export const otherColorsToObjectRGBA = <T extends object>(
  input: T,
  actualColorDataType: ColorModeType
): ObjectRgba => {
  switch (true) {
    case actualColorDataType === "rgba":
      if (isProperObjectType<ObjectRgba>(input, ["r", "g", "b", "a"]))
        return input;
    case actualColorDataType === "hsla":
      if (isProperObjectType<ObjectHsla>(input, ["h", "s", "l", "a"]))
        return hslaObjectToRgbaObject(input);
    case actualColorDataType === "hexa":
      if (isProperObjectType<ObjectHexa>(input, ["hex", "a"]))
        return hexaObjectToRgbaObject(input);
    default:
      return { r: 0, g: 0, b: 0, a: 100 };
  }
};

export const alphaToHex = (a: number) => {
  const intValue = Math.round((a / 100) * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0").toUpperCase();
};

/// CSS update

export const cssUpdate = (cssString: string, targetID: string) => {
  const cssEl = document.getElementById(targetID);
  cssEl && (cssEl.style.cssText = cssString);
};
