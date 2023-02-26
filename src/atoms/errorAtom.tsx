import { atom } from "recoil";

export interface ErrorState {
  message: string;
}

const defaultErrorState: ErrorState = {
  message: "",
};

export const errorState = atom<ErrorState>({
  key: "errorState",
  default: defaultErrorState,
});
