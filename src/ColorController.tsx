import react, { FormEvent, useEffect, useState } from "react";
import {
  ObjectRgba,
  ObjectHsla,
  ObjectHexa,
} from "./colorHelpers/colorObjectsInterfaces";
import "./styles/ColorController.css";

export type ColorDataType = "rgba" | "hsla" | "hexa";

interface ColorControllerProps {
  name: string;
  inputColor: any;
  outputColor: (color: any) => void;
  colorDataType: ColorDataType;
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
  inputColor = "rgba",
  outputColor,
  colorDataType,
}: ColorControllerProps) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [a, setA] = useState(0);
  const [hex, setHEX] = useState("");
  const [rgba, setRgba] = useState<ObjectRgba>({ r: 0, g: 0, b: 0, a: 100 });
  const [hsla, setHsla] = useState<ObjectHsla>({ h: 0, s: 100, l: 0, a: 100 });
  const [hexa, setHexa] = useState<ObjectHexa>({ hexa: "" });

  useEffect(() => {
    if (colorDataType === "rgba") inputColor;
    else if (colorDataType === "hsla") inputColor;
    else if (colorDataType === "hexa") inputColor;
  }, [colorDataType]);

  useEffect(() => {
    setRgba({ r: r, g: g, b: b, a: a });
  }, [r, g, b, a]);
  useEffect(() => {
    setHsla({ h: h, s: s, l: l, a: a });
  }, [h, s, l, a]);
  useEffect(() => {
    setHexa({ hexa: "#" + hex + a.toString(16) });
  }, [hex, a]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget)
      eval(`set${e.currentTarget.name.toUpperCase()}`)(e.currentTarget.value);
  };

  const inputGenerator = (inputOption: string) => {
    let inputsCutedList: InputList = [];

    if (inputOption === "rgba") {
      inputsCutedList = inputsList.filter(
        (inp) => inp.color === "rgb" || inp.color === "a"
      );
    } else if (inputOption === "hsla") {
      inputsCutedList = inputsList.filter(
        (inp) => inp.color === "hsl" || inp.color === "a"
      );
    } else return null;

    if (inputsCutedList)
      return inputsCutedList.map((inp, index) => (
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
        {colorDataType === "rgba" && inputGenerator("rgba")}

        {colorDataType === "hsla" && inputGenerator("hsla")}

        {colorDataType === "hexa" && (
          <>
            <label htmlFor="hex">
              HEX
              <input
                type="text"
                name="hex"
                onChange={(e) => handleInput(e)}
                value={hex}
              />
            </label>
            <label htmlFor="ahex">
              A
              <input
                type="range"
                name="a"
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
