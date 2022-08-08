import react, { FormEvent } from "react";

interface ColorChannelInputProps {
  id: number | string;
  name: string;
  min: number;
  max: number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value: number;
}

const InputColorChannelsSet = ({
  id,
  name,
  min,
  max,
  onChange,
  value,
}: ColorChannelInputProps) => {
  return (
    <label key={id} htmlFor={name}>
      <div className="color-controller-inputs-set">
        {name.toUpperCase()}
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          onChange={(e) => onChange(e)}
          value={value}
        />
        <input
          type="number"
          name={name}
          min={min}
          max={max}
          onChange={(e) => onChange(e)}
          value={value}
        />
      </div>
    </label>
  );
};
export default InputColorChannelsSet;
