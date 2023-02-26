import { atom, useRecoilValue } from "recoil";
import { resultState } from "./resultAtom";

export interface PageState {
  page: boolean;
}

export const pageState = atom<PageState>({
  key: "pageState",
  default: { page: false }, // false : inputform, true: result
});
