import { createContext } from "react";

interface SubmittedHomeForm {
  school: string;
  courseCode: string;
}

interface SubmittedAbroadForm {
  school: string;
}

export interface GlobalState {
  home?: SubmittedHomeForm | null;
  abroad?: SubmittedAbroadForm | null;
  userId?: string | null;
}

interface GlobalStateContext {
  state: GlobalState;
  setState: (state: GlobalState) => void;
}
export const Context = createContext<GlobalStateContext>(null as never);
