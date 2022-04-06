import react, { useEffect, useState } from "react";
import './styles/ColorController.css';

interface ColorControllerProps {
  name: string;
  inputColor: any;
  outputColor: (color: any) => void;
  colorDataType: "rgba" | "hsla" | "hexa";
}

const ColorController = ({
  name,
  inputColor,
  outputColor,
  colorDataType,
}: ColorControllerProps) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    if (colorDataType === "rgba") inputColor;
    else if (colorDataType === "hsla") inputColor;
    else if (colorDataType === "hexa") inputColor;
  }, [colorDataType]);

  return (
    <>
      <div className="color-controller">
        <div className="color-controller-title">{ name}</div>
        {colorDataType === "rgba" && (
          <>
            <label htmlFor="r">
              R
              <input type="range" name="r" min={0} max={255} /> 
            </label>
            <label htmlFor="g">
              G
              <input type="range" name="g" min={0} max={255} />
            </label>
            <label htmlFor="b">
              B
              <input type="range" name="b" min={0} max={255} />
            </label>
          </>
        )}

        {colorDataType === "hsla" && (
          <>
            <label htmlFor="h">
              H
              <input type="range" name="h" min={0} max={359} />
            </label>
            <label htmlFor="s">
              S
              <input type="range" name="s" min={0} max={100} />
            </label>
            <label htmlFor="l">
              L
              <input type="range" name="l" min={0} max={100} />
            </label>
          </>
        )}
        <label htmlFor="a">
          A
          <input type="range" name="a" min={0} max={100} />
        </label>
        {colorDataType === "hexa" && (
          <>
            <label htmlFor="hex">
              HEX
              <input type="text" name="hex" />
            </label>
            <label htmlFor="a">
              A
              <input type="text" name="a" />
            </label>
          </>
        )}
      </div>
    </>
  );
};
export default ColorController;
