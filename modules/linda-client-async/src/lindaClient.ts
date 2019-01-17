import io from "socket.io-client";
import { Tuple, Callback, ConnectCallback } from "./interfaces/index";
import { LindaOperation, LindaResponse } from "linda-interface";

export default class LindaClient {
  socket: SocketIOClient.Socket;
  tupleSpaceName: string;
  constructor() {}

  async connect(url: string, tsName: string) {
    this.socket = io(url);
    this.tupleSpaceName = tsName;
  }

  async read(tuple: Tuple) {
    let readOperation: LindaOperation = {
      _payload: tuple,
      _where: this.tupleSpaceName,
      _type: "read",
    };
    this.socket.on("_read_response", (resData: LindaResponse) => {
      return resData;
    });
    await this.socket.emit("_operation", readOperation);
  }

  async write(tuple: Tuple) {
    let fromInfo = null;
    if (tuple._from) {
      fromInfo = tuple._from;
    }
    let writeOperation: LindaOperation = {
      _payload: tuple,
      _where: this.tupleSpaceName,
      _type: "write",
      _from: fromInfo,
    };
    this.socket.on("_write_response", (resData: LindaResponse) => {
      return resData;
    });
    await this.socket.emit("_operation", writeOperation);
  }

  async take(tuple: Tuple) {
    let takeOperation: LindaOperation = {
      _payload: tuple,
      _where: this.tupleSpaceName,
      _type: "take",
    };
    this.socket.on("_take_response", (resData: LindaResponse) => {
      return resData;
    });
    await this.socket.emit("_operation", takeOperation);
  }

  watch(tuple: Tuple, callback: Callback) {
    let watchOperation: LindaOperation = {
      _payload: tuple,
      _where: this.tupleSpaceName,
      _type: "watch",
    };
    this.socket.on("_watch_response", (resData: LindaResponse) => {
      callback(resData);
    });
    this.socket.emit("_operation", watchOperation);
  }

  onDisconnected(callback: ConnectCallback) {
    this.socket.on("disconnect", callback);
  }
}
