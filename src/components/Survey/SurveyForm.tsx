import useQuery from "@/hooks/useQuery";
import React, { useEffect, useState } from "react";
import SurveyInputRating from "./SurveyInputRating";
import { BiReset, BiTimer } from "react-icons/bi";
import SurveyInputPacket from "./SurveyInputPacket";
import SurveyInputKeyword from "./Keyword/SurveyInputKeyword";
import SurveyInputType from "./SurveyInputType";
import Spinner from "../Spinner";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { resultState } from "../../atoms/resultAtom";
import { errorState } from "@/atoms/errorAtom";
import { TIME_LIMIT } from "@/lib/openai";
import { SiOpenai } from "react-icons/si";
import { pageState } from "@/atoms/pageAtom";

type SurveyFormProps = {};

export type SurveyFormState = {
  menu: string;
  type?: string;
  company?: string;
  rating: number;
  keyword?: string[];
  packet: number;
};

const defaultFormState: SurveyFormState = {
  menu: "",
  type: "",
  company: "",
  rating: 5,
  packet: 30,
  keyword: [],
};

export const isTooFast = () => {
  if (!localStorage.timer) return false;
  return Date.now() - parseInt(localStorage.timer) < TIME_LIMIT;
};

const SurveyForm: React.FC<SurveyFormProps> = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [remainedTime, setRemainedTime] = useState(0);
  const setError = useSetRecoilState(errorState);
  const setPage = useSetRecoilState(pageState);
  const setResultStateValue = useSetRecoilState(resultState);
  const { postQuery } = useQuery();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (name === "packet" && Number(value) < 20) {
      value = "20";
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ message: "" });
    // Prevents multiple submissions and invalid inputs
    if (isTooFast()) {
      setError({
        message: "잠시 후에 시도해주세요.",
      });
      return;
    }
    if (isLoading) {
      setError({ message: "리뷰를 불러오는 중입니다." });
      return;
    }
    if (formState.menu.length < 1) {
      setError({ message: "메뉴를 반드시 기입해주세요." });
      return;
    }

    // Sending Query
    setIsLoading(true);
    // console.log("formState Check:", formState);
    try {
      const { result } = await postQuery(formState);
      // console.log("onSubmit postQuery result:", result);
      setResultStateValue((prev) => ({
        ...prev,
        content: result,
        date: Date.now(),
      }));
    } catch (error: any) {
      console.error("Review generation error", error);
      setError({ message: "리뷰 생성에 실패했습니다." });
    }
    localStorage.setItem("timer", "" + Date.now());
    // console.log("Timer Set", localStorage.timer);
    setIsLoading(false);
    setRemainedTime(60);
    setPage({ page: true });
  };

  const getRemainedTime = () => {
    const timePassed = TIME_LIMIT - Date.now() + parseInt(localStorage.timer);
    const timeCalculated = Math.floor(timePassed / 1000);
    if (timeCalculated < 0) return 0;
    return timeCalculated;
  };

  useEffect(() => {
    setRemainedTime(getRemainedTime());

    if (remainedTime > 0) {
      const interval = setInterval(() => {
        setRemainedTime((prev) => prev - 1);
        console.log("Timer Running");
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainedTime]);

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="input-group input-group-vertical w-full">
          <span className="label-text">메뉴*</span>
          <input
            className="input-bordered input"
            type="text"
            name="menu"
            value={formState.menu}
            onChange={onChange}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <SurveyInputType formState={formState} setFormState={setFormState} />
          <label className="input-group input-group-vertical w-full">
            <span className="label-text">업체</span>
            <input
              className="input-bordered input input-sm"
              type="text"
              name="company"
              value={formState.company}
              onChange={onChange}
            />
          </label>
        </div>
        <SurveyInputRating value={formState.rating} onChange={onChange} />
        <SurveyInputKeyword formState={formState} setFormState={setFormState} />
        <SurveyInputPacket
          value={formState.packet}
          onChange={onChange}
        ></SurveyInputPacket>

        <div className="grid grid-cols-4 gap-3">
          <button
            className="btn-error btn text-primary-content"
            type="reset"
            onClick={() => setFormState(defaultFormState)}
          >
            <BiReset size="1.5rem" />
          </button>
          {remainedTime ? (
            <div className="btn col-span-3 cursor-not-allowed">
              <BiTimer className="mr-2 text-lg" />
              {remainedTime} 초 기다려주세요.
            </div>
          ) : (
            <button
              className="btn-success btn col-span-3 text-lg text-primary-content"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <SiOpenai className="mr-2" />
                  생성
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </>
  );
};
export default SurveyForm;
