"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var LindaClient = /** @class */ (function () {
    function LindaClient() {
    }
    LindaClient.prototype.connect = function (url, callback) {
        if (this.validateURL(url)) {
            //if (true) {
            var urlArray = url.split("/");
            this.socket = io(urlArray[0] + "//" + urlArray[2]);
            this.tupleSpaceName = urlArray[3];
            this.socket.emit("_join_tuplespace", { tsName: this.tupleSpaceName });
            callback();
        }
        else {
            throw "cannot parse URL";
        }
    };
    LindaClient.prototype.write = function (tuple, callback) {
        var writeData = { tsName: this.tupleSpaceName, payload: tuple };
        this.socket.on("_write_response", function (resData) {
            callback(resData);
        });
        this.socket.emit("_write_operation", writeData);
    };
    LindaClient.prototype.watch = function (tuple, callback) {
        var watchData = { tsName: this.tupleSpaceName, payload: tuple };
        this.socket.on("_watch_response", function (resData) {
            callback(resData);
        });
        this.socket.emit("_watch_operation", watchData);
    };
    LindaClient.prototype.onDisconnected = function (callback) {
        this.socket.on("disconnect", callback);
    };
    LindaClient.prototype.validateURL = function (url) {
        var regex = /^(http|https):\/\/([\w-]+\.)+([\w-]|:)+\/[\w-]+/;
        var regex2 = /^(http|https):\/\/localhost:[0-9]+\/[\w-]+/;
        return regex.test(url) || regex2.test(url);
    };
    return LindaClient;
}());
exports.default = LindaClient;
//# sourceMappingURL=index.js.map