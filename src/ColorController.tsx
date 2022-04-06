import react, {
  FormEvent,
  InputHTMLAttributes,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "./styles/ColorController.css";

interface ColorControllerProps {
  name: string;
  inputColor: any;
  outputColor: (color: any) => void;
  colorDataType: "rgba" | "hsla" | "hexa";
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
  const [hexA, setHEXA] = useState("");

  useEffect(() => {
    if (colorDataType === "rgba") inputColor;
    else if (colorDataType === "hsla") inputColor;
    else if (colorDataType === "hexa") inputColor;
  }, [colorDataType]);

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
                type="text"
                name="ahex"
                onChange={(e) => handleInput(e)}
                value={hexA}
              />
            </label>
          </>
        )}
      </div>
    </>
  );
};
export default ColorController;
