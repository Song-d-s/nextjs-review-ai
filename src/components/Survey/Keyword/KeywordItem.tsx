import React from "react";
import { BiX } from "react-icons/bi";
import { SurveyFormState } from "../SurveyForm";

interface KeywordItemProps {
  keyword: string;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setFormState: React.Dispatch<React.SetStateAction<SurveyFormState>>;
}

const KeywordItem: React.FC<KeywordItemProps> = ({
  keyword,
  keywords,
  setKeywords,
  setFormState,
}) => {
  const onClick = () => {
    const updatedKeywords = keywords.filter((item) => item !== keyword);
    setKeywords(updatedKeywords);
    setFormState((prev) => ({ ...prev, keyword: updatedKeywords }));
  };
  return (
    <div className="badge-success badge mr-1 whitespace-nowrap py-3 ">
      <span className="mr-1 text-primary-content">{keyword}</span>
      <div
        className="rounded-full bg-primary-content text-success"
        onClick={onClick}
      >
        <BiX />
      </div>
    </div>
  );
};
export default KeywordItem;
