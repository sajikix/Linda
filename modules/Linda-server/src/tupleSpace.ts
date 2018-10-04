import {
  Tuple,
  ResponseTuple,
  IsMuchResponse,
  WatchCallback,
  WriteCallback,
  ReadTakeCallback,
  InsertOneWriteOpResult,
  WatchResponseTuple,
  InsertData,
} from "./interfaces";
import { EventEmitter2 } from "eventemitter2";
// default:using MongoDB
import storageClient from "./dbclient/memoryClient";

export default class tupleSpace {
  emitter: EventEmitter2;
  storage: storageClient;
  tupleSpaceName: string;
  constructor(tupleSpaceName: string) {
    this.emitter = new EventEmitter2({
      wildcard: true,
      delimiter: "::",
      newListener: false,
      maxListeners: 20,
      verboseMemoryLeak: false,
    });
    this.tupleSpaceName = tupleSpaceName;
    this.storage = new storageClient(tupleSpaceName);
  }

  async write(writeTuple: Tuple, callback: WriteCallback): Promise<void> {
    const resData: InsertData = await this.storage.insert(writeTuple);
    this.emitter.emit("_writeData", writeTuple);

    callback(resData);
  }
  async read(searchTuple: Tuple, callback: ReadTakeCallback): Promise<void> {
    let resData: ResponseTuple = await this.storage.get(searchTuple);
    callback(resData);
  }

  watch(watchTuple: Tuple, callback: WatchCallback): void {
    this.emitter.on("_writeData", (resTuple: Tuple) => {
      let result: IsMuchResponse = this.storage.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        const resData: WatchResponseTuple = {
          _time: Date.now(),
          _from: this.tupleSpaceName,
          _payload: result.res,
        };
        callback(resData);
      }
    });
  }

  async take(takeTuple: Tuple, callback: ReadTakeCallback): Promise<void> {
    let resData: ResponseTuple = await this.storage.get(takeTuple);
    if (resData._isMuched) {
      await this.storage.delete(resData._id);
    }
    callback(resData);
  }
}
