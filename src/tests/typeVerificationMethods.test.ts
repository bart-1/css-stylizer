import { ObjectHsla } from "../colorHelpers/colorObjectsInterfaces";
import {
  ColorModeType,
  isOfUnionType,
  isProperObjectType,
} from "../appLibrary";

const pattern = ["h", "s", "l", "a"];
const objectHSLA = { h: 100, s: 100, l: 100, a: 100 };
const objectRGBA = { r: 100, g: 100, b: 100, a: 100 };

const patternUnion = ["rgba", "hsla", "hexa"];
const correctPhrase = "rgba";
const uncorrectPhrase = "rgbb";

test("check isProperObjectType() with object consistent to pattern", () => {
  const result = isProperObjectType<ObjectHsla>(objectHSLA, pattern);
  expect(result).toBe(true);
});

test("check isProperObjectType() with object inconsistent to pattern ", () => {
  const result = isProperObjectType<ObjectHsla>(objectRGBA, pattern);
  expect(result).toBe(false);
});
test("check isProperObjectType() with object consistent to pattern", () => {
  const result = isOfUnionType<ColorModeType>(correctPhrase, patternUnion);
  expect(result).toBe(true);
});

test("check isProperObjectType() with object inconsistent to pattern ", () => {
  const result = isOfUnionType<ColorModeType>(uncorrectPhrase, patternUnion);
  expect(result).toBe(false);
});
