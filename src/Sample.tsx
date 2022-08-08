import react, { ElementRef, RefAttributes, RefCallback, useRef } from "react";
import "./styles/Sample.css";

interface SampleProps {
  sampleID: string;
}

const Sample = ({ sampleID }: SampleProps) => {
  return (
    <>
      <div className="sample" id={`txt${sampleID}`}>
        <p className="sample" id={`txt${sampleID}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, sint
          in consectetur nobis fugit non repellendus, nostrum eveniet accusamus
          amet fugiat ullam nam adipisci accusantium, mollitia nemo eos.
          Adipisci, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quaerat, sint in consectetur nobis fugit non repellendus,
          nostrum eveniet accusamus amet fugiat ullam nam adipisci accusantium,
          mollitia nemo eos. Adipisci, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat, sint in consectetur nobis fugit
          non repellendus, nostrum eveniet accusamus amet fugiat ullam nam
          adipisci accusantium, mollitia nemo eos. Adipisci, quos.
        </p>
      </div>
    </>
  );
};
export default Sample;
