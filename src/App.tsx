import react, { useEffect, useState } from "react";
import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";

const numberOfSamples = [1, 2, 3];

export interface CssDataSet {
  id: string;
  colorTxt: string;
  colorBg: string;
}

function App() {
  const [cssDataSet, setCssDataSet] = useState<CssDataSet[]>([
    {
      id: "test",
      colorTxt: "black",
      colorBg: "gray",
    },
  ]);

  const samplesSet = numberOfSamples.map((sample) => (
    <div className="sample-set">
      <Sample sampleID={`sample${sample}`} />
      <ControlPanel
        sampleName={`sample${sample}`}
        exportData={(data) =>
          setCssDataSet((prevState) => prevState.concat(data))
        }
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
