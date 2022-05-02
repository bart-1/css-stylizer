import { FormEvent, useEffect, useState } from "react";
import {
  ObjectRgba,
  ObjectHsla,
  ObjectHexa,
} from "./colorHelpers/colorObjectsInterfaces";
import "./styles/ColorController.css";

export type ColorModeType = "rgba" | "hsla" | "hexa";
export type OutputColorData = ObjectHexa | ObjectHsla | ObjectRgba | string;

interface ColorControllerProps {
  name: string;
  inputColor: string;
  colorDataType: ColorModeType;
  targetID: string;
  outputColor: (outputColor: OutputColorData) => void;
}

type InputList = {
  id: number;
  name: string;
  min: number;
  max: number;
  color: string;
}[];

const inputsList = [
  { id: 0, name: "r", min: 0, max: 255, color: "rgb" },
  { id: 1, name: "g", min: 0, max: 255, color: "rgb" },
  { id: 2, name: "b", min: 0, max: 255, color: "rgb" },
  { id: 3, name: "h", min: 0, max: 359, color: "hsl" },
  { id: 4, name: "s", min: 0, max: 100, color: "hsl" },
  { id: 5, name: "l", min: 0, max: 100, color: "hsl" },
  { id: 6, name: "a", min: 0, max: 100, color: "a" },
];

const ColorController = ({
  name,
  inputColor,
  targetID,
  outputColor,
  colorDataType = "rgba",
}: ColorControllerProps) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [h, setH] = useState(0);
  const [s, setS] = useState(100);
  const [l, setL] = useState(0);
  const [a, setA] = useState(100);
  const [hex, setHEX] = useState("000000");

  useEffect(() => {
    if (inputColor === "white") {
      setR(255);
      setG(255);
      setB(255);
      setS(100);
      setL(100);
      setHEX("ffffff");
    }
  }, []);

  useEffect(() => {
    colorDataType === "rgba" &&
      outputColor(`rgba(${r}, ${g}, ${b}, ${a / 100})`);
  }, [r, g, b, a]);

  useEffect(() => {
    colorDataType === "hsla" &&
      outputColor(`hsl(${h}, ${s}%, ${l}%, ${a / 100})`);
  }, [h, s, l, a]);

  useEffect(() => {
    colorDataType === "hexa" &&
      outputColor(`#${hex.toUpperCase()}${alphaToHex(a)}`);
  }, [hex, a]);

  const alphaToHex = (a: number) => {
    const intValue = Math.round((a / 100) * 255);
    const hexValue = intValue.toString(16);
    return hexValue.padStart(2, "0");
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget)
      eval(`set${e.currentTarget.name.toUpperCase()}`)(e.currentTarget.value);
  };

  const inputGenerator = (inputOption: string) => {
    let inputsFilteredList: InputList = [];

    if (inputOption === "rgba") {
      inputsFilteredList = inputsList.filter(
        (inp) => inp.color === "rgb" || inp.color === "a"
      );
    } else if (inputOption === "hsla") {
      inputsFilteredList = inputsList.filter(
        (inp) => inp.color === "hsl" || inp.color === "a"
      );
    } else return null;

    if (inputsFilteredList)
      return inputsFilteredList.map((inp, index) => (
        <label key={inp.id} htmlFor={inp.name}>
          {inp.name.toUpperCase()}
          <input
            type="range"
            name={inp.name}
            min={inp.min}
            max={inp.max}
            onChange={(e) => handleInput(e)}
            value={eval(inp.name)}
          />
          <input
            type="number"
            name={inp.name}
            min={inp.min}
            max={inp.max}
            onChange={(e) => handleInput(e)}
            value={eval(inp.name)}
          />
        </label>
      ));
  };

  return (
    <>
      <div className="color-controller">
        <div className="color-controller-title">{name}</div>
        {colorDataType === "rgba" && <>{inputGenerator("rgba")}</>}

        {colorDataType === "hsla" && <>{inputGenerator("hsla")}</>}

        {colorDataType === "hexa" && (
          <>
            <label htmlFor="hex">
              #
              <input
                type="text"
                name="hex"
                minLength={6}
                maxLength={6}
                onChange={(e) => handleInput(e)}
                value={hex}
              />
            </label>
            <label htmlFor="a">
              A
              <input
                type="range"
                name="a"
                min={0}
                max={100}
                onChange={(e) => handleInput(e)}
                value={a}
              />
              <input
                type="number"
                min={0}
                max={100}
                onChange={(e) => handleInput(e)}
                value={a}
              />
            </label>
          </>
        )}
      </div>
    </>
  );
};
export default ColorController;
