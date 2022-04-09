import { useEffect, useState } from "react";
import { CssDataSet } from "./App";
import ColorController, { ColorDataType } from "./ColorController";
import "./styles/ControlPanel.css";

interface ControlPanelProps {
  sampleName: string;
  exportData: (data: CssDataSet) => void;
  colorModel: ColorDataType;
  targets: string[];
}

const ControlPanel = ({
  sampleName,
  exportData,
  colorModel,
  targets,
}: ControlPanelProps) => {
  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    exportData({ id: sampleName, colorTxt: textColor, colorBg: bgColor });
  }, []);

  const colorsControllers = targets.map((target) => (
      <ColorController
        name={target}
        inputColor={""}
        outputColor={(color) => setTextColor(color)}
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
