import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { SurveyFormState } from "../SurveyForm";
import KeywordItem from "./KeywordItem";

interface SurveyInputKeywordProps {
  formState: SurveyFormState;
  setFormState: React.Dispatch<React.SetStateAction<SurveyFormState>>;
}

const SurveyInputKeyword: React.FC<SurveyInputKeywordProps> = ({
  setFormState,
  formState,
}) => {
  const [newKeyword, setNewKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewKeyword(event.target.value);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newKeyword.trim() === "" || keywords.includes(newKeyword)) {
      setNewKeyword("");
      return;
    }
    const updatedKeywords = [...keywords, newKeyword];

    setKeywords(updatedKeywords);
    setFormState((prev) => ({ ...prev, keyword: updatedKeywords }));
    setNewKeyword("");
  };

  useEffect(() => {
    setKeywords(formState.keyword || []);
  }, [formState.keyword]);

  return (
    <>
      <div className="relative w-full">
        <label className="input-group input-group-vertical">
          <span className="label-text">키워드</span>
          <div className="input-bordered input"></div>
        </label>
        <div className="absolute right-0 left-0 bottom-2.5 flex overflow-x-auto px-2 scrollbar-hide">
          {keywords.map((keyword) => (
            <KeywordItem
              key={keyword}
              keyword={keyword}
              keywords={keywords}
              setKeywords={setKeywords}
              setFormState={setFormState}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <input
          type="text"
          name=""
          className="input-bordered input input-sm col-span-4"
          maxLength={10}
          value={newKeyword}
          onChange={onChange}
          placeholder="키워드 입력"
        />
        <button className="btn-sm btn" onClick={onClick}>
          <BiPlus />
        </button>
      </div>
    </>
  );
};
export default SurveyInputKeyword;
