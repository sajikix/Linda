"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
class LindaClient {
    constructor() { }
    connect(url, callback) {
        if (this.validateURL(url)) {
            //if (true) {
            const urlArray = url.split("/");
            this.socket = io(urlArray[0] + "//" + urlArray[2]);
            this.tupleSpaceName = urlArray[3];
            this.socket.emit("_join_tuplespace", { tsName: this.tupleSpaceName });
            callback();
        }
        else {
            throw "cannot parse URL";
        }
    }
    write(tuple, callback) {
        let writeData = { tsName: this.tupleSpaceName, payload: tuple };
        this.socket.on("_write_response", (resData) => {
            callback(resData);
        });
        this.socket.emit("_write_operation", writeData);
    }
    watch(tuple, callback) {
        let watchData = { tsName: this.tupleSpaceName, payload: tuple };
        this.socket.on("_watch_response", (resData) => {
            callback(resData);
        });
        this.socket.emit("_watch_operation", watchData);
    }
    onDisconnected(callback) {
        this.socket.on("disconnect", callback);
    }
    validateURL(url) {
        const regex = /^(http|https):\/\/([\w-]+\.)+([\w-]|:)+\/[\w-]+/;
        const regex2 = /^(http|https):\/\/localhost:[0-9]+\/[\w-]+/;
        return regex.test(url) || regex2.test(url);
    }
}
exports.default = LindaClient;
//# sourceMappingURL=lindaClient.js.map