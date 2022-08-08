import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";
import { samplesSetup } from "./appLibrary";



function App() {

  const samplesSet = samplesSetup.map((sample) => (
    <div className="sample-set" key={sample.id}>
      <Sample sampleID={`sample${sample.id}`} />
      <ControlPanel
        sampleID={`sample${sample.id}`}
        colorModel={sample.colorModel}
        CSSTargets={sample.CSSTargets}
        initialColorData={sample.initialValues}
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
