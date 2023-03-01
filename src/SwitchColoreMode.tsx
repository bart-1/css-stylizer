import { ChangeEvent } from "react";
import { ColorModeType, isOfUnionType } from "./appLibrary";

interface SwitchColoreModeProps {
    targetID: string;
    targetName: string;
    actualColorDataType: string;
    outputData: (data:ColorModeType) => void;
}

const SwitchColoreMode = ({targetID, targetName, actualColorDataType, outputData}:SwitchColoreModeProps) => {

     const handleRadioButtons = (e: ChangeEvent<HTMLInputElement>) => {
       const unionTypeArray = ["rgba", "hsla", "hexa"];
       if (isOfUnionType<ColorModeType>(e.currentTarget.value, unionTypeArray))
         outputData(e.currentTarget.value);
     };

  return (
    <>
      <div className="color-mode-switcher">
        <label>
          RGB-A
          <input
            type="radio"
            name={`rgba${targetID + targetName}`}
            value="rgba"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleRadioButtons(e)
            }
            checked={actualColorDataType === "rgba"}
          />
        </label>
      </div>
      <div className="color-mode-switcher">
        <label>
          HSL-A
          <input
            type="radio"
            name={`hsla${targetID + targetName}`}
            value="hsla"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleRadioButtons(e)
            }
            checked={actualColorDataType === "hsla"}
          />
        </label>
      </div>
      <div className="color-mode-switcher">
        <label>
          HEX-A
          <input
            type="radio"
            name={`hexa${targetID + targetName}`}
            value="hexa"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleRadioButtons(e)
            }
            checked={actualColorDataType === "hexa"}
          />
        </label>
      </div>
    </>
  );
};

export default SwitchColoreMode;
