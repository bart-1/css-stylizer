import {useEffect, useState} from 'react';
import { CssDataSet } from './App';
import ColorController from './ColorController';
import './styles/ControlPanel.css';

interface ControlPanelProps {
    sampleName: string;
    exportData: (data: CssDataSet) => void;
}

const ControlPanel = ({ sampleName, exportData }: ControlPanelProps) => {
    const [textColor, setTextColor] = useState('');
    const [bgColor, setBgColor] = useState('');

    useEffect( () => {
         exportData({id: sampleName , colorTxt: textColor, colorBg: bgColor})
    }, [] );
     
        return (
          <>
            <div className="control-panel">
              <ColorController
                name="text"
                inputColor={""}
                outputColor={(color) => setTextColor(color)}
                colorDataType={"rgba"}
              />
              <ColorController
                name="background"
                inputColor={""}
                outputColor={(color) => setBgColor(color)}
                colorDataType={"rgba"}
              />
            </div>
          </>
        );
};
export default ControlPanel;
