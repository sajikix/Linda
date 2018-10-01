"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tupleSpace_1 = require("./tupleSpace");
class Linda {
    constructor() {
        this.tupleSpaces = {};
    }
    tupleSpace(tupleSpaceName) {
        if (!this.tupleSpaces[tupleSpaceName]) {
            this.tupleSpaces[tupleSpaceName] = new tupleSpace_1.default(tupleSpaceName);
        }
        return this.tupleSpaces[tupleSpaceName];
    }
    listen(server, io) {
        console.log("linda-listening");
        this.server = server;
        this.io = io;
        io.sockets.on("connection", (socket) => {
            socket.on("_read_operation", (data) => {
                this.tupleSpace(data.tsName).read(data.payload, (resData) => {
                    socket.emit("_read_response", resData);
                });
            });
            socket.on("_write_operation", (data) => {
                this.tupleSpace(data.tsName).write(data.payload, (resData) => {
                    socket.emit("_write_response", resData);
                });
            });
            socket.on("_take_operation", (data) => {
                this.tupleSpace(data.tsName).take(data.payload, (resData) => {
                    socket.emit("_take_response", resData);
                });
            });
            socket.on("_watch_operation", (data) => {
                this.tupleSpace(data.tsName).watch(data.payload, (resData) => {
                    socket.emit("_watch_response", resData);
                });
            });
            socket.on("_subscribed_data", (data) => {
                this.tupleSpace(data.tsName).watch(data.payload, (resData) => {
                    socket.emit("_watch_response", resData);
                });
            });
        });
    }
}
exports.default = Linda;
//# sourceMappingURL=linda.js.map