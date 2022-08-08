import { useEffect, useState } from "react";
import ColorController from "./ColorController";
import {
  ObjectRgba,
} from "./colorHelpers/colorObjectsInterfaces";
import {
  ColorModeType,
  ControllerDataPack,
  cssUpdate,
  initialControllerDataPack,
  OutputColorData,
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
  initialColorData: { [key: string]: OutputColorData };
}

const ControlPanel = ({
  sampleID,
  colorModel,
  CSSTargets,
  initialColorData,
}: ControllPanelProps) => {
  const [controllerDataPack, setControllerDataPack] = useState<
    ControllerDataPack[]
    >(initialControllerDataPack);
  
 const [colorOutput, setColorOutput] = useState({r:0, g:0, b:0, a:100});

  
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
      initialColorData={target === 'color' && initialColorData.color || target === 'background-color' && initialColorData.background || '00000000FF'}
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
