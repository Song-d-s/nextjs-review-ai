import React from "react";

type SurveyInputRatingProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
};

const SurveyInputRating: React.FC<SurveyInputRatingProps> = ({
  onChange,
  value,
}) => {
  return (
    <>
      <div className="relative w-full">
        <label className="input-group input-group-vertical">
          <span className="label-text">글자수: {value}</span>
          <div className="input-bordered input"></div>
        </label>
        <div className="absolute bottom-2 left-0 right-0 px-3">
          <input
            name="packet"
            type="range"
            min={0}
            max={200}
            className="range range-success range-sm"
            step="10"
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    </>
  );
};
export default SurveyInputRating;
