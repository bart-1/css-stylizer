import { useEffect, useState } from "react";
import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";
import { ColorDataType } from "./ColorController";

type Targets = 'bodyText' | 'background' | 'windowBackground' | 'windowTitle' | 'windowHeaderBackground' | 'windowText';
type SamplesSetup = { id: number, targets: Targets[], colorModel: ColorDataType };

export interface CssDataSet {
  id: string;
  colorTxt: string;
  colorBg: string;
}
const samplesSetup: SamplesSetup[] = [
  { id: 1, targets: ["bodyText", "background"], colorModel: "rgba" },
  { id: 2, targets: ["bodyText", "background"], colorModel: "hsla" },
  { id: 3, targets: ["bodyText", "background"], colorModel: "hexa" },
];

function App() {
  const [cssDataSet, setCssDataSet] = useState<CssDataSet[]>([
    {
      id: "test",
      colorTxt: "black",
      colorBg: "gray",
    },
  ]);

  const samplesSet = samplesSetup.map((sample) => (
    <div className="sample-set" key={sample.id}>
      <Sample sampleID={`sample${sample}`} />
      <ControlPanel
        sampleName={`sample${sample.id}`}
        exportData={(data) =>
          setCssDataSet((prevState) => prevState.concat(data))
        }
        colorModel={sample.colorModel}
        targets={sample.targets}
      />
    </div>
  ));

  useEffect(() => {
    cssDataSet.forEach((cssData) => {
      const cssNest = document.getElementById(`${cssData.id}`);
      if (cssNest)
        cssNest.style.cssText = `color: ${cssData.colorTxt}; background-color: ${cssData.colorBg}`;
    });
  }, [cssDataSet]);

  return (
    <>
      <div className="App" id="app">
        <div className="samples">{samplesSet}</div>
      </div>
    </>
  );
}

export default App;
