import {
  InsertData,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  ResponseTuple,
  SavedData,
  IsMuchResponse,
} from "../interfaces";
import { Tuple } from "linda-interface";

import collection from "../db/mongoDB";
import { ObjectID } from "bson";
import { Collection } from "mongodb";

export default class storageClient {
  collection: Collection;
  tupleSpaceName: string;

  constructor(tupleSpaceName: string) {
    this.collection = collection(tupleSpaceName);
    console.log(tupleSpaceName);
    this.tupleSpaceName = tupleSpaceName;
  }

  async get(searchTuple: Tuple): Promise<ResponseTuple> {
    console.log(searchTuple);
    const document: SavedData | null = await this.collection.findOne(
      { _payload: searchTuple },
      {
        sort: { time: -1 },
      }
    );
    if (document == null) {
      return {
        _isMuched: false,
        _id: null,
        _from: this.tupleSpaceName,
        _payload: null,
        _time: null,
      };
    } else {
      return Object.assign(document, {
        _isMuched: true,
      });
    }
  }

  insert(writeTuple: Tuple): Promise<InsertOneWriteOpResult> {
    const time = Date.now();
    const insertData: InsertData = {
      _time: time,
      _from: this.tupleSpaceName,
      _payload: writeTuple,
    };
    return this.collection.insertOne(insertData);
  }
  delete(id: ObjectID): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ _id: id });
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
