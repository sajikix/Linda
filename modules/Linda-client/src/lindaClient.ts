import * as io from "socket.io-client";
import {
  Tuple,
  Callback,
  ResponseTuple,
  ConnectCallback,
} from "./interfaces/index";

export default class LindaClient {
  socket: SocketIOClient.Socket;
  tupleSpaceName: string;
  constructor() {}

  connect(url: string, callback: ConnectCallback) {
    if (this.validateURL(url)) {
      //if (true) {
      const urlArray = url.split("/");
      this.socket = io(urlArray[0] + "//" + urlArray[2]);
      this.tupleSpaceName = urlArray[3];
      this.socket.emit("_join_tuplespace", { tsName: this.tupleSpaceName });
      callback();
    } else {
      throw "cannot parse URL";
    }
  }

  read(tuple: Tuple, callback: Callback) {
    let readData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.emit("_read_operation", readData);
    this.socket.on("_read_response", (resData: ResponseTuple) => {
      callback(resData);
    });
  }

  write(tuple: Tuple, callback: Callback) {
    let writeData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_write_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_write_operation", writeData);
  }

  take(tuple: Tuple, callback: Callback) {
    let takeData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_take_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_take_operation", takeData);
  }
  watch(tuple: Tuple, callback: Callback) {
    let watchData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_watch_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_watch_operation", watchData);
  }
  onDisconnected(callback: ConnectCallback) {
    this.socket.on("disconnect", callback);
  }
  private validateURL(url: string): boolean {
    const regex = /^(http|https):\/\/([\w-]+\.)+([\w-]|:)+\/[\w-]+/;
    const regex2 = /^(http|https):\/\/localhost:[0-9]+\/[\w-]+/;
    return regex.test(url) || regex2.test(url);
  }
}
