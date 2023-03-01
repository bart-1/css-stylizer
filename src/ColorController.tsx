import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import {
  ColorModeType,
  InputList,
  inputsList,
  isOfConcreteObjectType,
  isOfUnionType,
  otherColorsToObjectRGBA,
} from "./appLibrary";
import "./styles/ColorController.css";
import {
  ObjectHexa,
  ObjectHsla,
  ObjectRgba,
} from "./colorHelpers/colorObjectsInterfaces";
import { rgbaObjectToHslaObject } from "./colorHelpers/rgbaObjectToHslaObject";
import { rgbaObjectToHexaString } from "./colorHelpers/rgbaObjectToHexaString";
import SwitchColoreMode from "./SwitchColoreMode";
import InputHex from "./InputHex";
import InputColorChannelsSet from "./InputColorChannelsSet";

interface ColorControllerProps {
  name: string;
  initialColorValues?: ObjectRgba | ObjectHsla | ObjectHexa;
  initialColorModel: ColorModeType;
  targetID: string;
  outputColor: (outputColor: ObjectRgba) => void;
}

const ColorController = ({
  name,
  initialColorValues,
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
  const [hex, setHex] = useState("#000000");

  const [colorDataType, setColorDataType] = useState<ColorModeType>("rgba");

  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (
      initialColorValues &&
      isOfConcreteObjectType<ObjectRgba>(initialColorValues, [
        "r",
        "g",
        "b",
        "a",
      ])
    ) {
      setR(initialColorValues.r);
      setG(initialColorValues.g);
      setB(initialColorValues.b);
      setA(initialColorValues.a);
    }
    if (
      initialColorValues &&
      isOfConcreteObjectType<ObjectHsla>(initialColorValues, [
        "h",
        "s",
        "l",
        "a",
      ])
    ) {
      setH(initialColorValues.h);
      setS(initialColorValues.s);
      setL(initialColorValues.l);
      setA(initialColorValues.a);
    }
    if (
      initialColorValues &&
      isOfConcreteObjectType<ObjectHexa>(initialColorValues, ["hex", "a"])
    ) {
      setHex(initialColorValues.hex);
      setA(initialColorValues.a);
    }

    setColorDataType(initialColorModel);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      const rgba = { r: r, g: g, b: b, a: a };
      inputToAllColorsChannels(rgba);
      outputColor(rgba);
    }
  }, [r, g, b, a]);

  useEffect(() => {
    if (isReady) {
      const rgba = otherColorsToObjectRGBA<ObjectHsla>(
        { h: h, s: s, l: l, a: a },
        "hsla"
      );
      inputToAllColorsChannels(rgba);
      outputColor(rgba);
    }
  }, [h, s, l, a]);

  useEffect(() => {
    if (isReady) {
      const rgba = otherColorsToObjectRGBA<ObjectHexa>(
        { hex: hex, a: a },
        "hexa"
      );
      inputToAllColorsChannels(rgba);
      outputColor(rgba);
    }
  }, [hex, a]);

  const inputToAllColorsChannels = <T extends object>(
    objectRGBA: ObjectRgba
  ): void => {
    const hsla = rgbaObjectToHslaObject(objectRGBA),
      hexa = rgbaObjectToHexaString(objectRGBA);
    if (colorDataType !== "rgba") {
      setR(objectRGBA.r);
      setG(objectRGBA.g);
      setB(objectRGBA.b);
    }
    if (colorDataType !== "hsla") {
      setH(hsla.h);
      setS(hsla.s);
      setL(hsla.l);
    }
    setA(objectRGBA.a);

    if (colorDataType !== "hexa") setHex(hexa);
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
        <fieldset className="color-controller-fieldset">
          <legend className="color-controller-legend">{name}</legend>
          {colorDataType === "rgba" && <>{inputGenerator("rgba")}</>}

          {colorDataType === "hsla" && <>{inputGenerator("hsla")}</>}

          {colorDataType === "hexa" && (
            <>
              <InputHex
                input={hex}
                inputA={a}
                output={(hex) => {
                  setHex(hex);
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
            key={targetID + name}
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

