"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
// default:using MongoDB
const memoryClient_1 = require("./dbclient/memoryClient");
class tupleSpace {
    constructor(tupleSpaceName) {
        this.emitter = new eventemitter2_1.EventEmitter2({
            wildcard: true,
            delimiter: "::",
            newListener: false,
            maxListeners: 20,
            verboseMemoryLeak: false,
        });
        this.tupleSpaceName = tupleSpaceName;
        this.storage = new memoryClient_1.default(tupleSpaceName);
    }
    write(writeTuple, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const resData = yield this.storage.insert(writeTuple);
            this.emitter.emit("_writeData", writeTuple);
            callback(resData);
        });
    }
    read(searchTuple, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let resData = yield this.storage.get(searchTuple);
            callback(resData);
        });
    }
    watch(watchTuple, callback) {
        this.emitter.on("_writeData", (resTuple) => {
            let result = this.storage.isMuch(resTuple, watchTuple);
            if (result.isMuched) {
                const resData = {
                    _time: Date.now(),
                    _from: this.tupleSpaceName,
                    _payload: result.res,
                };
                callback(resData);
            }
        });
    }
    take(takeTuple, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let resData = yield this.storage.get(takeTuple);
            if (resData._isMuched) {
                yield this.storage.delete(resData._id);
            }
            callback(resData);
        });
    }
}
exports.default = tupleSpace;
//# sourceMappingURL=tupleSpace.js.map