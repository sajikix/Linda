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
    for (i = this.tupleSpace.length; i > 0; i--) {
      let result = this.isMuch(this.tupleSpace[i - 1], tuple);
      if (result.isMuched) {
        let resData: ResponseTuple = Object.assign(this.tupleSpace[i - 1], {
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
    this.tupleSpace.push(insertData);
    return insertData;
  }
  //update() {}
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
