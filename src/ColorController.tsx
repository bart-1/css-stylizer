import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import {
  ColorModeType,
  InputList,
  inputsList,
  otherColorsToObjectRGBA,
} from "./appLibrary";
import "./styles/ColorController.css";
import { ObjectHsla, ObjectRgba } from "./colorHelpers/colorObjectsInterfaces";
import { rgbaObjectToHslaObject } from "./colorHelpers/rgbaObjectToHslaObject";
import { rgbaObjectToHexaString } from "./colorHelpers/rgbaObjectToHexaString";
import SwitchColoreMode from "./SwitchColoreMode";
import InputHex from "./InputHex";
import InputColorChannelsSet from "./InputColorChannelsSet";

interface ColorControllerProps {
  name: string;
  initialColorData: ObjectRgba;
  initialColorModel: ColorModeType;
  targetID: string;
  outputColor: (outputColor: ObjectRgba) => void;
}

const ColorController = ({
  name,
  initialColorData,
  initialColorModel,
  targetID,
  outputColor,
}: ColorControllerProps) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [h, setH] = useState(0);
  const [s, setS] = useState(100);
  const [l, setL] = useState(0);
  const [a, setA] = useState(100);
  const [hex, setHEX] = useState("000000FF");

  const [colorDataType, setColorDataType] = useState<ColorModeType>("rgba");

  useLayoutEffect(() => {

    if (initialColorData) {
       setR(initialColorData.r);
       setG(initialColorData.g);
       setB(initialColorData.b);
    }
  }, []);

  useEffect(() => {
    const rgba = { r: r, g: g, b: b, a: a };
    inputToAllColorsChannels(rgba);
    outputColor(rgba);
  }, [r, g, b, a]);

  useEffect(() => {
    const rgba = otherColorsToObjectRGBA<ObjectHsla>(
      { h: h, s: s, l: l, a: a },
      "hsla"
    );
    inputToAllColorsChannels(rgba);
    outputColor(rgba);
  }, [h, s, l, a]);

  const inputToAllColorsChannels = <T extends object>(
    objectRGBA: ObjectRgba
  ): void => {
    const hsla = rgbaObjectToHslaObject(objectRGBA);
    const hexa = rgbaObjectToHexaString(objectRGBA);
    if (colorDataType !== "rgba") {
      setR(objectRGBA.r);
      setG(objectRGBA.g);
      setB(objectRGBA.b);
    }
    setH(hsla.h);
    setS(hsla.s);
    setL(hsla.l);
    setA(objectRGBA.a);
    setHEX(hexa);
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget)
      eval(`set${e.currentTarget.name.toUpperCase()}`)(
        Math.round(Number(e.currentTarget.value))
      );
  };

  const inputGenerator = (inputSetType: string) => {
    let inputsFilteredList: InputList = [];

    if (inputSetType === "rgba") {
      inputsFilteredList = inputsList.filter(
        (inp) => inp.color === "rgb" || inp.color === "a"
      );
    } else if (inputSetType === "hsla") {
      inputsFilteredList = inputsList.filter(
        (inp) => inp.color === "hsl" || inp.color === "a"
      );
    } else return null;

    if (inputsFilteredList)
      return inputsFilteredList.map((inp, index) => (
        <InputColorChannelsSet
          key={inp.id + targetID + name}
          id={inp.id + index}
          name={inp.name}
          min={inp.min}
          max={inp.max}
          onChange={(e) => handleInput(e)}
          value={eval(inp.name)}
        />
      ));
  };

  return (
    <>
      <div className="color-controller">
        <fieldset className="color-controller-title">
          <legend className="color-controller-legend">{name}</legend>
          {colorDataType === "rgba" && <>{inputGenerator("rgba")}</>}

          {colorDataType === "hsla" && <>{inputGenerator("hsla")}</>}

          {colorDataType === "hexa" && (
            <>
              <InputHex
                input={hex}
                output={(rgba) => {
                  inputToAllColorsChannels(rgba);
                  outputColor(rgba);
                }}
              />
              <InputColorChannelsSet
                id="a-hex"
                name="a"
                min={0}
                max={100}
                onChange={(e) => handleInput(e)}
                value={a}
              />
            </>
          )}
          <SwitchColoreMode
            targetID={targetID}
            targetName={name}
            actualColorDataType={colorDataType}
            outputData={(type) => setColorDataType(type)}
          />
        </fieldset>
      </div>
    </>
  );
};
export default ColorController;
