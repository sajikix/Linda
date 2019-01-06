import { LindaResponse } from "linda-interface";

export type Tuple = {
  [key: string]: number | string | boolean | Object;
};

export interface ConnectCallback {
  (): Promise<void>;
}

export interface Callback {
  (resData: LindaResponse): void;
}
