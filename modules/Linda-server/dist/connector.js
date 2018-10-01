"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
const Linda_client_1 = require("Linda-client");
class Connecotr extends eventemitter2_1.EventEmitter2 {
    constructor() {
        super();
    }
    subscribe(host, tsName, tuple) {
        const client = new Linda_client_1.default();
        const url = host + "/" + tsName;
        client.connect(url, () => {
            client.watch(tuple, (resData) => {
                this.emit("_subscribed_data", resData);
            });
        });
    }
}
exports.default = Connecotr;
//# sourceMappingURL=connector.js.map