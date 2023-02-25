import React from "react";
import { BiX } from "react-icons/bi";

type KeywordItemProps = {
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  keyword: string;
};

const KeywordItem: React.FC<KeywordItemProps> = ({ keyword, setKeywords }) => {
  const onClick = () => {
    console.log(keyword);
    setKeywords((prev) => prev.filter((item) => item !== keyword));
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
