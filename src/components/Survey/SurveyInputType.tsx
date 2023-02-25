import React, { useEffect, useRef, useState } from "react";
import { FOOD_TYPES } from "@/lib/foodtypes";
import { SurveyFormState } from "./SurveyForm";

type SurveyInputTypeProps = {
  formState: SurveyFormState;
  setFormState: React.Dispatch<React.SetStateAction<SurveyFormState>>;
};

const SurveyInputType: React.FC<SurveyInputTypeProps> = ({
  formState,
  setFormState,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAway = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickAway);
    return () => {
      document.removeEventListener("click", onClickAway);
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // console.log(value);
    setInputValue(value);
    setFormState((prev) => ({ ...prev, type: value.trim() }));
    if (value === "") {
      setSuggestions([]);
    } else {
      const filtered = FOOD_TYPES.filter((type) => type.includes(value));
      const sorted = [...filtered].sort(
        (a, b) =>
          a.indexOf(value) - b.indexOf(value) || a.localeCompare(b, "ko-KR")
      );
      setSuggestions(sorted);
    }
  };

  const onClickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setFormState((prev) => ({ ...prev, type: suggestion }));
    setSuggestions([]);
  };

  useEffect(() => {
    setInputValue(formState.type || "");
  }, [formState.type]);

  return (
    <>
      <div className="relative w-full" ref={inputRef}>
        <input
          name="type"
          className="input-bordered input h-full w-full"
          type="text"
          placeholder="종류"
          value={inputValue}
          onChange={onChange}
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 z-40 w-full overflow-hidden rounded-md border bg-base-200">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="cursor-pointer px-3 py-1 hover:bg-base-100"
                onClick={() => onClickSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default SurveyInputType;
