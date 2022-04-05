import react from 'react';
import './styles/Sample.css';

interface SampleProps {
   className: string
}

const Sample = ({ className }: SampleProps) => {
     
        return (
            <>
                <div className={className}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, sint in consectetur nobis fugit non repellendus, nostrum eveniet accusamus amet fugiat ullam nam adipisci accusantium, mollitia nemo eos. Adipisci, quos.</p>
                </div>
            </>
        )
};
export default Sample;
