"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter2_1 = require("eventemitter2");
var Linda_client_1 = require("Linda-client");
var Connecotr = /** @class */ (function (_super) {
    __extends(Connecotr, _super);
    function Connecotr() {
        return _super.call(this) || this;
    }
    Connecotr.prototype.subscribe = function (host, tsName, tuple) {
        var _this = this;
        var client = new Linda_client_1.default();
        var url = host + "/" + tsName;
        client.connect(url, function () {
            client.watch(tuple, function (resData) {
                _this.emit("_subscribed_data", resData);
            });
        });
    };
    return Connecotr;
}(eventemitter2_1.EventEmitter2));
exports.default = Connecotr;
//# sourceMappingURL=connector.js.map