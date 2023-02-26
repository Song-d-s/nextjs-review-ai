import { resultState } from "@/atoms/resultAtom";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RxCopy, RxReset } from "react-icons/rx";
import { pageState } from "@/atoms/pageAtom";

type ResultProps = {};

const Result: React.FC<ResultProps> = () => {
  const result = useRecoilValue(resultState);
  const setPage = useSetRecoilState(pageState);
  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="input-group input-group-vertical w-full">
          <span className="label-text">생성된 리뷰</span>
          <div className="input-bordered input h-auto whitespace-normal py-2">
            <p className="w-full bg-transparent px-0 py-2">{result.content}</p>
          </div>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn-info btn text-base text-primary-content"
            onClick={() => {
              navigator.clipboard.writeText(result.content);
            }}
          >
            <RxCopy className="mr-2" />
            복사
          </button>
          <button
            className="btn-success btn text-base text-primary-content"
            onClick={() => {
              setPage({ page: false });
            }}
          >
            <RxReset className="mr-2" />
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
};
export default Result;
