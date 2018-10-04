"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tupleSpace_1 = require("./tupleSpace");
var Linda = /** @class */ (function () {
    function Linda() {
        this.tupleSpaces = {};
    }
    Linda.prototype.tupleSpace = function (tupleSpaceName) {
        if (!this.tupleSpaces[tupleSpaceName]) {
            this.tupleSpaces[tupleSpaceName] = new tupleSpace_1.default(tupleSpaceName);
        }
        return this.tupleSpaces[tupleSpaceName];
    };
    Linda.prototype.listen = function (server, io) {
        var _this = this;
        console.log("linda-listening");
        this.server = server;
        this.io = io;
        io.sockets.on("connection", function (socket) {
            socket.on("_read_operation", function (data) {
                _this.tupleSpace(data.tsName).read(data.payload, function (resData) {
                    socket.emit("_read_response", resData);
                });
            });
            socket.on("_write_operation", function (data) {
                _this.tupleSpace(data.tsName).write(data.payload, function (resData) {
                    socket.emit("_write_response", resData);
                });
            });
            socket.on("_take_operation", function (data) {
                _this.tupleSpace(data.tsName).take(data.payload, function (resData) {
                    socket.emit("_take_response", resData);
                });
            });
            socket.on("_watch_operation", function (data) {
                _this.tupleSpace(data.tsName).watch(data.payload, function (resData) {
                    socket.emit("_watch_response", resData);
                });
            });
            socket.on("_subscribed_data", function (data) {
                _this.tupleSpace(data.tsName).watch(data.payload, function (resData) {
                    socket.emit("_watch_response", resData);
                });
            });
        });
    };
    return Linda;
}());
exports.default = Linda;
//# sourceMappingURL=linda.js.map