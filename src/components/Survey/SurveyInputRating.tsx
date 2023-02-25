import React, { useRef } from "react";

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
          <span className="label-text">점수: {value}</span>
          <div className="input-bordered input"></div>
        </label>
        <div className="absolute bottom-2 left-0 right-0 px-3">
          <input
            name="rating"
            type="range"
            min={0}
            max={10}
            className={`range ${
              value >= 5 ? "range-success" : "range-error"
            } range-sm`}
            step="1"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
export default SurveyInputRating;
