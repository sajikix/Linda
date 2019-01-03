import io from "socket.io-client";
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

  async connect(url: string) {
    if (await this.validateURL(url)) {
      const urlArray = url.split("/");
      this.socket = await io(urlArray[0] + "//" + urlArray[2]);
      this.tupleSpaceName = urlArray[3];
      await this.socket.emit("_join_tuplespace", {
        tsName: this.tupleSpaceName,
      });
    } else {
      throw "cannot parse URL";
    }
  }

  async read(tuple: Tuple) {
    let readData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_read_response", (resData: ResponseTuple) => {
      return resData;
    });
    await this.socket.emit("_read_operation", readData);
  }

  async write(tuple: Tuple) {
    let writeData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_write_response", (resData: ResponseTuple) => {
      return resData;
    });
    await this.socket.emit("_write_operation", writeData);
  }

  async take(tuple: Tuple) {
    let takeData = { tsName: this.tupleSpaceName, payload: tuple };
    this.socket.on("_take_response", (resData: ResponseTuple) => {
      return resData;
    });
    await this.socket.emit("_take_operation", takeData);
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
  private async validateURL(url: string): Promise<boolean> {
    const regex = /^(http|https):\/\/([\w-]+\.)+([\w-]|:)+\/[\w-]+/;
    const regex2 = /^(http|https):\/\/localhost:[0-9]+\/[\w-]+/;
    return regex.test(url) || regex2.test(url);
  }
}
