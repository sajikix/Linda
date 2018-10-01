import { EventEmitter2 } from "eventemitter2";
import LindaClient from "Linda-client";
import { WatchResponseTuple, Tuple } from "./interfaces";

export default class Connecotr extends EventEmitter2 {
  constructor() {
    super();
  }

  subscribe(host: string, tsName: string, tuple: Tuple) {
    const client = new LindaClient();
    const url = host + "/" + tsName;
    client.connect(
      url,
      () => {
        client.watch(tuple, (resData: WatchResponseTuple) => {
          this.emit("_subscribed_data", resData);
        });
      }
    );
  }
}
