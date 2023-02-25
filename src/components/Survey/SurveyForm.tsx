import useQuery from "@/hooks/useQuery";
import React, { useState } from "react";
import SurveyInputRating from "./SurveyInputRating";
import { BiReset } from "react-icons/bi";
import SurveyInputPacket from "./SurveyInputPacket";
import SurveyInputKeyword from "./Keyword/SurveyInputKeyword";
import SurveyInputType from "./SurveyInputType";

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
  packet: 200,
  keyword: [],
};

const SurveyForm: React.FC<SurveyFormProps> = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const { postQuery } = useQuery();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (name === "packet" && Number(value) < 50) {
      value = "50";
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("formState Check:", formState);
    try {
      const { result } = await postQuery(formState);
      console.log("onSubmit result:", result);
    } catch (error) {
      console.error("Review generation error", error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 p-2">
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
          <button
            className="btn-success btn col-span-3 text-lg text-primary-content"
            type="submit"
          >
            생성
          </button>
        </div>
      </form>
      <div>{}</div>
    </>
  );
};
export default SurveyForm;
