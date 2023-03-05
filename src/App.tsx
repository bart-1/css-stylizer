import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";
import { samplesSetup } from "./appLibrary";
import Footer from "./Footer";



function App() {

  const samplesSet = samplesSetup.map((sample) => (
    <div className="sample-set" key={sample.id}>
      <Sample sampleID={`sample${sample.id}`} />
      <ControlPanel
        sampleID={`sample${sample.id}`}
        colorModel={sample.colorModel}
        CSSTargets={sample.CSSTargets}
        initialColorValues={sample.initialColorValues}
      />
    </div>
  ));

  return (
    <>
      <div className="App" id="app">
        <div className="samples">{samplesSet}</div>
      <Footer />
      </div>
    </>
  );
}

export default App;
