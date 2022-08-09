import { hexaObjectToRgbaObject } from "../colorHelpers/hexaObjectToRgbaObject";
import { hexaStringToRgbaObject } from "../colorHelpers/hexaStringToRgbaObject";
import { hslaObjectToHexaString } from "../colorHelpers/hslaObjectToHexaString";
import { hslaObjectToRgbaObject } from "../colorHelpers/hslaObjectToRgbaObject";
import { rgbaObjectToHexaString } from "../colorHelpers/rgbaObjectToHexaString";
import { rgbaObjectToHslaObject } from "../colorHelpers/rgbaObjectToHslaObject";

const hexaObjectColor = { hex: "#D0C3DF", a: 100 };
const hexStringColor = "#D0C3DF";
const hslaObjectColor = { h: 268, s: 30, l: 82, a: 100 };
const rgbaObjectColor = { r: 208, g: 195, b: 223, a: 100 };

test("hex string to objectRgba convertion works fine", () => {
  const result = hexaStringToRgbaObject(hexStringColor);
  expect(result).toStrictEqual(rgbaObjectColor);
});

test("objectHsla to hex string convertion works fine", () => {
  const result = hslaObjectToHexaString(hslaObjectColor);
  expect(result).toStrictEqual(hexStringColor);
});

test("objectHsla to objectRgba convertion works fine", () => {
  const result = hslaObjectToRgbaObject(hslaObjectColor);
  expect(result).toStrictEqual(rgbaObjectColor);
});

test("objectRgba to hex string convertion works fine", () => {
  const result = rgbaObjectToHexaString(rgbaObjectColor);
  expect(result).toStrictEqual(hexStringColor);
});

test("check validation of parameters in hslaObjectToRgbaObject convertion", () => {
  const wrongHslaColorValues = { h: -370, s: 33, l: 33, a: 150 };
  const result = hslaObjectToRgbaObject(wrongHslaColorValues);
  const expectedHslaColorValues = hslaObjectToRgbaObject({
    h: 10,
    s: 33,
    l: 33,
    a: 100,
  });
  expect(result).toStrictEqual(expectedHslaColorValues);
});

test("objectRgba to objectHsla convertion works fine", () => {
  const result = rgbaObjectToHslaObject(rgbaObjectColor);
  expect(result).toStrictEqual(hslaObjectColor);
});

test("objectHexa to objectRgba convertion works fine", () => {
  const result = hexaObjectToRgbaObject(hexaObjectColor);
  expect(result).toStrictEqual(rgbaObjectColor);
});
