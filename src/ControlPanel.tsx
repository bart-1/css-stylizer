import { useEffect, useLayoutEffect, useState } from "react";
import ColorController, {
  ColorModeType,
  OutputColorData,
} from "./ColorController";
import "./styles/ControlPanel.css";

type ControllerOutput = {
  target: string;
  value: OutputColorData;
  otherParams?: { colorMode: ColorModeType };
};

interface ControlPanelProps {
  sampleID: string;
  colorModel: ColorModeType;
  CSSTargets: string[];
}

const ControlPanel = ({
  sampleID,
  colorModel,
  CSSTargets,
}: ControlPanelProps) => {
  const [controllersData, setControllersData] = useState<ControllerOutput[]>([
    {
      target: "color",
      value: "rgba(0, 0, 0, 100)",
      otherParams: { colorMode: "rgba" },
    },
    {
      target: "background-color",
      value: "rgba(255, 255, 255, 100",
      otherParams: { colorMode: "rgba" },
    },
  ]);

  useEffect(() => {
    const cssEl = document.getElementById("txt" + sampleID);
    const stateToString = controllersData.map((element) => {
      return `${element.target}: ${element.value};`;
    });
    const cssString = stateToString.join(" ");
    cssEl && (cssEl.style.cssText = cssString);
  }, [controllersData]);

  const check = (outputColor: OutputColorData, target: string) => {
    const isTarget = controllersData.map((element) => {
      if (element.target === target && element.value !== outputColor)
        element.value = outputColor;
      return element;
    });
    setControllersData(isTarget);
  };

  const colorsControllers = CSSTargets.map((target) => (
    <ColorController
      key={target + sampleID}
      targetID={sampleID}
      name={target}
      inputColor={target === "color" ? "black" : "white"}
      outputColor={(outputColor) => check(outputColor, target)}
      colorDataType={colorModel}
    />
  ));

  return (
    <>
      <div className="control-panel">{colorsControllers}</div>
    </>
  );
};
export default ControlPanel;
