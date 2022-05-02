import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";
import { ColorModeType } from "./ColorController";

type CSSTargets = "color" | "background-color";
type SamplesSetup = {
  id: number;
  CSSTargets: CSSTargets[];
  colorModel: ColorModeType;
};

const samplesSetup: SamplesSetup[] = [
  { id: 1, CSSTargets: ["color", "background-color"], colorModel: "rgba" },
  { id: 2, CSSTargets: ["color", "background-color"], colorModel: "hsla" },
  { id: 3, CSSTargets: ["color", "background-color"], colorModel: "hexa" },
];

function App() {

  const samplesSet = samplesSetup.map((sample) => (
    <div className="sample-set" key={sample.id}>
      <Sample sampleID={`sample${sample.id}`} />
      <ControlPanel
        sampleID={`sample${sample.id}`}
        colorModel={sample.colorModel}
        CSSTargets={sample.CSSTargets}
      />
    </div>
  ));

  return (
    <>
      <div className="App" id="app">
        <div className="samples">{samplesSet}</div>
      </div>
    </>
  );
}

export default App;
