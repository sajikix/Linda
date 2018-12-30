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
        { _id: 0, time: Date.now(), type: "init" },
      ];
      console.log(tupleSpaceName + " is created");
    }
  }
  // .map使って書き直せる説
  get(tuple: Tuple): ResponseTuple {
    let i: number;
    for (const t of this.tupleSpace) {
      let result = this.isMuch(t._payload, tuple);
      if (result.isMuched) {
        let resData: ResponseTuple = Object.assign(t, {
          _isMuched: true,
        });
        return resData;
      }
    }
    if (i == 0) {
      return {
        _isMuched: false,
        _id: null,
        _from: this.tupleSpaceName,
        _payload: null,
        _time: null,
      };
    }
  }

  insert(writeTuple: Tuple): InsertData {
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
  //update() {}
  delete(id: number): void {
    this.tupleSpace.splice(id, 1);
  }

  isMuch(targetTuple: Tuple, searchTuple: Tuple): IsMuchResponse {
    for (let operationKey in searchTuple) {
      if (!targetTuple[operationKey]) {
        console.log("1stif");
        console.log(operationKey);
        console.log("target", targetTuple);
        return { isMuched: false, res: null };
      } else if (targetTuple[operationKey] != searchTuple[operationKey]) {
        console.log("2ndif");
        return { isMuched: false, res: null };
      }
    }
    return { isMuched: true, res: targetTuple };
  }
}
