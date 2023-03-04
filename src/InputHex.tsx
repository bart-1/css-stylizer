import react, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { alphaToHex } from "./appLibrary";

interface InputHexProps {
  output: (hex: string) => void;
  outputA: (hex: number) => void;
  input: string;
  inputA: number;
}

const InputHex = ({ input, inputA, output, outputA }: InputHexProps) => {
  const [hex, setHex] = useState("");
  const [hexA, setHexA] = useState(100);

  useEffect(() => {
    setHex(input);
    setHexA(inputA);
  }, []);
  useEffect(() => {
    setHexA(inputA);
  }, [inputA]);

  const handleHexInput = (e: ChangeEvent<HTMLInputElement>) => {
    const hexRegex = /[#a-fA-F0-9]/gm;
    let inputValue = e.currentTarget.value;

    switch (true) {
      case inputValue[0] !== "#":
        inputValue = "#" + inputValue;
      case inputValue.length > 7:
        inputValue = inputValue.slice(0, 7);
      case inputValue.match(hexRegex)?.length !== inputValue.length:
        break;
    
      default:
        setHex(inputValue);
    }

    console.log(inputValue);
  };

  const handleHexSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hex.length < 7) {
      output(hex.padEnd(7, "0"));
      setHex((prevState) => prevState.padEnd(7, "0"));
    } else {
      output(hex);
    }
    outputA(hexA);
  };
  return (
    <>
      <form onSubmit={handleHexSubmit}>
        <div className="hex-inputs">
          <div className="hex">
            <label htmlFor="hex">HEX</label>
            <input
              className="hex"
              type="text"
              name="hex"
              onChange={handleHexInput}
              value={hex.toUpperCase()}
            />
          </div>
          <div className="a-hex">
            <label htmlFor="a-hex">A</label>
            <input
              disabled
              className="a-hex"
              type="text"
              name="hex-a"
              minLength={2}
              maxLength={2}
              value={alphaToHex(hexA)}
            />
          </div>
        </div>
        <button className="input-submit" type="submit">
          OK
        </button>
      </form>
    </>
  );
};
export default InputHex;
