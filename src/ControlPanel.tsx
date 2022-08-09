import { useEffect, useState } from "react";
import ColorController from "./ColorController";
import {
  ObjectHexa,
  ObjectHsla,
  ObjectRgba,
} from "./colorHelpers/colorObjectsInterfaces";
import {
  ColorModeType,
  ControllerDataPack,
  cssUpdate,
  initialControllerDataPack,
} from "./appLibrary";
import "./styles/ControlPanel.css";



const controllerStateToCssString = (controllerDataPack: ControllerDataPack[]) => {
  const preparedPack = controllerDataPack.map((element) => {
    return `${element.target}: rgba(${element.value.r}, ${element.value.g}, ${element.value.b}, ${element.value.a/100});`;
  });
  return preparedPack.join(" ");
};

interface ControllPanelProps {
  sampleID: string;
  colorModel: ColorModeType;
  CSSTargets: string[];
  initialColorValues: { [key: string]: ObjectRgba | ObjectHsla | ObjectHexa };
}

const ControlPanel = ({
  sampleID,
  colorModel,
  CSSTargets,
  initialColorValues,
}: ControllPanelProps) => {
  const [controllerDataPack, setControllerDataPack] = useState<
    ControllerDataPack[]
    >(initialControllerDataPack);
  
  
  const handleOutput = (outputColor: ObjectRgba, target: string, sampleID: string) => {
    const isTarget = controllerDataPack.map((element) => {
      if (element.target === target)
      element.value = outputColor;
      return element;
    });
    
    const cssString = controllerStateToCssString(isTarget);
    const cssElID = "txt" + sampleID;
    cssUpdate(cssString, cssElID);
    
  };
  
  

  const colorsControllers = CSSTargets.map((target) => (
    <ColorController
      key={target + sampleID}
      targetID={sampleID}
      name={target}
      initialColorValues={target === 'color' && initialColorValues.color || target === 'background-color' && initialColorValues.background || undefined}
      outputColor={(outputColor) => {
        handleOutput(outputColor, target, sampleID)
      }}
      initialColorModel={colorModel}
    />
  ));

  return (
    <>
      <div className="control-panel">{colorsControllers}</div>
    </>
  );
};
export default ControlPanel;
