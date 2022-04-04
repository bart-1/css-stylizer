import react, { useState } from "react";
import "./styles/App.css";
import ControlPanel from "./ControlPanel";
import Sample from "./Sample";

function App() {
  const [colorText, setColorText] = useState('');
  const [colorBackground, setColorBackground] = useState('');
  
  return (
    <div className="App">
      <div className="samples">
        <Sample colorBackground={""} colorText={""} />
        <Sample colorBackground={""} colorText={""} />
        <Sample colorBackground={""} colorText={""} />
      </div>
      <ControlPanel props={ ''}/>
    </div>
  );
}

export default App;
