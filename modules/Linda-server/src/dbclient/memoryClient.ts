import {
  IsMuchResponse,
  Tuple,
  ResponseTuple,
  InsertData,
} from "../interfaces";

import memoryDB from "../db/memoryDB";

export default class storageClient {
  tupleSpace: any;
  tupleSpaceName: string;
  constructor(tupleSpaceName: string) {
    this.tupleSpaceName = tupleSpaceName;
    if (memoryDB[tupleSpaceName]) {
      this.tupleSpace = memoryDB[tupleSpaceName];
      console.log(tupleSpaceName + " is already exist");
    } else {
      this.tupleSpace = memoryDB[tupleSpaceName] = [
        {
          _id: 0,
          time: Date.now(),
          _payload: { type: "init" },
          _from: tupleSpaceName,
        },
      ];
      console.log(tupleSpaceName + " is created");
    }
  }
  // .map使って書き直せる説
  async get(tuple: Tuple): Promise<ResponseTuple> {
    for (const t of this.tupleSpace) {
      console.log(this.tupleSpace.length);
      console.log("t", t);
      console.log("tuple", tuple);
      let result = this.isMuch(t._payload, tuple);
      if (result.isMuched) {
        let resData: ResponseTuple = Object.assign(t, {
          _isMuched: true,
        });
        return resData;
      }
    }

    return {
      _isMuched: false,
      _id: null,
      _from: this.tupleSpaceName,
      _payload: null,
      _time: null,
    };
  }

  insert(writeTuple: Tuple): InsertData {
    console.log("inserted");
    const time = Date.now();
    const insertData: InsertData = {
      _time: time,
      _from: this.tupleSpaceName,
      _payload: writeTuple,
      _id: this.tupleSpace.length,
    };
    this.tupleSpace.unshift(insertData);
    return insertData;
  }

  delete(id: number): void {
    this.tupleSpace.splice(id, 1);
  }

  isMuch(targetTuple: Tuple, searchTuple: Tuple): IsMuchResponse {
    for (let operationKey in searchTuple) {
      if (!targetTuple[operationKey]) {
        return { isMuched: false, res: null };
      } else if (targetTuple[operationKey] != searchTuple[operationKey]) {
        return { isMuched: false, res: null };
      }
    }
    return { isMuched: true, res: targetTuple };
  }
}
