import react, { FormEvent, useEffect, useState } from "react";
import { alphaToHex } from "./appLibrary";

interface InputHexProps {
  output: (hex: string) => void;
  input: string;
  inputA: number;
}

const InputHex = ({ input, inputA, output }: InputHexProps) => {
  const [hex, setHex] = useState("000000");
  useEffect(() => {
    setHex(input);
  }, [input]);

  const handleHexInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget) setHex(String(e.currentTarget.value));
  };

  const handleHexSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    output(hex);
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
            value={hex + alphaToHex(inputA).toUpperCase()}
          />
          <button type="submit">OK</button>
        </label>
      </form>
    </>
  );
};
export default InputHex;
