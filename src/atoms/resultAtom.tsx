import { atom } from "recoil";

export interface ResultState {
  content: string;
  date: number;
}

const defaultResultState: ResultState = {
  content: "",
  date: 0,
};

export const resultState = atom<ResultState>({
  key: "ResultState",
  default: defaultResultState,
});
