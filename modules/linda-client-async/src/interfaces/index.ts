import { ObjectId } from "bson";

export type Tuple = {
  [key: string]: number | string | boolean | Object;
};

export interface ConnectCallback {
  (): Promise<void>;
}

export interface Callback {
  (resData: ResponseTuple): Promise<void>;
}

export type ResponseTuple = {
  _isMuched: boolean;
  _time: number;
  _from: string;
  _id: ObjectId;
  _payload: Object;
};
