import react, { FormEvent, useEffect, useState } from "react";
import { alphaToHex } from "./appLibrary";

interface InputHexProps {
  output: (hex: string) => void;
  outputA: (hex: number) => void;
  input: string;
  inputA: number;
}

const InputHex = ({ input, inputA, output, outputA }: InputHexProps) => {
  const [hex, setHex] = useState("000000");
  const [hexA, setHexA] = useState(100);

  useEffect(() => {
    setHex(input);
  }, [input]);

  useEffect(() => {
    setHexA(inputA);
  }, [inputA]);

  const handleHexInput = (e: FormEvent<HTMLInputElement>) => {
    const hexRegex = /[a-fA-F0-9]/gm;
    const testResult = e.currentTarget.value.match(hexRegex);
    console.log(testResult)
    if (e.currentTarget.value && testResult!.length === e.currentTarget.value.length)
      setHex(String(e.currentTarget.value));
  };
  const handleHexAInput = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget) setHexA(Number(e.currentTarget.value));
  };

  const handleHexSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    output(hex);
    outputA(hexA);
  };
  return (
    <>
      <form onSubmit={(e) => handleHexSubmit(e)}>
        <label htmlFor="hex">
          #
          <div className="hex-inputs">
            <input
              className="hex"
              type="text"
              name="hex"
              minLength={1}
              maxLength={7}
              onChange={(e) => handleHexInput(e)}
              value={hex}
            />
            <input
              className="a-hex"
              type="text"
              name="hex-a"
              minLength={2}
              maxLength={2}
              onChange={(e) => handleHexAInput(e)}
              value={alphaToHex(hexA)}
            />
          </div>
          <button type="submit">OK</button>
        </label>
      </form>
    </>
  );
};
export default InputHex;
