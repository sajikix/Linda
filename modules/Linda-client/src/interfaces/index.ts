import { ObjectId } from "bson";

export type Tuple = {
  [key: string]: number | string | boolean | Object;
};

export interface ConnectCallback {
  (): void;
}

export interface Callback {
  (resData: ResponseTuple): void;
}

export type ResponseTuple = {
  _isMuched: boolean;
  _time: number;
  _from: string;
  _id: ObjectId;
  _payload: Object;
};
