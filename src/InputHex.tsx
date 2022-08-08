import react, { FormEvent, useEffect, useState } from "react";
import { otherColorsToObjectRGBA } from "./appLibrary";
import { ObjectHexa, ObjectRgba } from "./colorHelpers/colorObjectsInterfaces";

interface InputHexProps {
  output: (rgba:ObjectRgba) => void;
  input: string;
}

const InputHex = ({ input, output }: InputHexProps) => {

    const [hex, setHex] = useState("000000FF");
    useEffect( () => {
        setHex(input)
         
    }, [input] );

     const handleHexInput = (e: FormEvent<HTMLInputElement>) => {
       if (e.currentTarget) setHex(String(e.currentTarget.value));
     };

     const handleHexSubmit = (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const rgba = otherColorsToObjectRGBA<ObjectHexa>({ hexa: hex }, "hexa");
       output(rgba);
     };
  return (
    <>
      <form onSubmit={(e) => handleHexSubmit(e)}>
        <label htmlFor="hex">
          #
          <input
            type="text"
            name="hex"
            minLength={1}
            maxLength={9}
            onChange={(e) => handleHexInput(e)}
            value={hex}
          />
          <button type="submit">OK</button>
        </label>
      </form>
    </>
  );
};
export default InputHex;
