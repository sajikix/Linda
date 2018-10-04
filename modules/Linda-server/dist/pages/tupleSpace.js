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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Linda_Client_1 = require("Linda-Client");
var lindaClient = new Linda_Client_1.default();
var TupleSpace = /** @class */ (function (_super) {
    __extends(TupleSpace, _super);
    function TupleSpace(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tuples: [],
            watchingTuple: {},
        };
        return _this;
    }
    TupleSpace.prototype.parseURLParams = function () {
        var returnObj = {};
        var queryStringArray = location.search.substring(1).split("&");
        queryStringArray.map(function (value) {
            var element = value.split("=");
            returnObj[element[0]] = element[1];
        });
        this.setState({ watchingTuple: returnObj });
    };
    TupleSpace.prototype.writeTuple = function (tuple) {
        return function () {
            lindaClient.connect("http://localhost:3000/masuilab", function () {
                lindaClient.write(tuple, function (data) { });
            });
        };
    };
    TupleSpace.prototype.watchTuple = function (tuple) {
        var _this = this;
        lindaClient.connect("http://localhost:3000/masuilab", function () {
            console.log(tuple);
            lindaClient.watch(tuple, function (data) {
                _this.setState({ tuples: _this.state.tuples.concat([data._payload]) });
            });
        });
    };
    TupleSpace.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseURLParams()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.watchTuple(this.state.watchingTuple)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TupleSpace.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, location.pathname.substring(1) + "/" + JSON.stringify(this.state.watchingTuple)),
            React.createElement("h2", null, "write"),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.writeTuple(this.state.watchingTuple) }, JSON.stringify(this.state.watchingTuple))),
            React.createElement("div", null, "%curl -d 'tuple=" + JSON.stringify(this.state.watchingTuple) + "' " + location.host),
            React.createElement("h2", null, "watch"),
            React.createElement("div", null, this.state.tuples.map(function (tuple) {
                return React.createElement("ul", null, JSON.stringify(tuple));
            }))));
    };
    return TupleSpace;
}(React.Component));
ReactDOM.render(React.createElement(TupleSpace, null), document.getElementById("content"));
//# sourceMappingURL=tupleSpace.js.map