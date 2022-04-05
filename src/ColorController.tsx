import react, { useEffect, useState } from "react";

interface ColorControllerProps {
  name: string;
  inputColor: any;
  outputColor: (color:any)=> void;
  colorDataType: "rgba" | "hsla" | "hexa";
}

const ColorController = ({
  inputColor,
  outputColor,
  colorDataType,
}: ColorControllerProps) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    if (colorDataType === 'rgba')
      inputColor
    else if (colorDataType === 'hsla')
      inputColor
    else if (colorDataType === "hexa")
      inputColor
  },[colorDataType])

  
  return (
    <>
      <div className="color-controller">
        {colorDataType === "rgba" && (
          <>
            <input type="range" name="r" min={0} max={255} />
            <input type="range" name="g" min={0} max={255} />
            <input type="range" name="b" min={0} max={255} />
          </>
        )}

        {colorDataType === "hsla" && (
          <>
            <input type="range" name="h" min={0} max={359} />
            <input type="range" name="s" min={0} max={100} />
            <input type="range" name="l" min={0} max={100} />
          </>
        )}
        <input type="range" name="a" min={0} max={100} />
        {colorDataType === "hexa" && (
          <>
            <input type="text" name="hex" />
            <input type="text" name="a" />
          </>
        )}
      </div>
    </>
  );
};
export default ColorController;
