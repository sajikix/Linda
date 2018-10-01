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
const mongoDB_1 = require("../db/mongoDB");
class storageClient {
    constructor(tupleSpaceName) {
        this.collection = mongoDB_1.default(tupleSpaceName);
        console.log(tupleSpaceName);
        this.tupleSpaceName = tupleSpaceName;
    }
    get(searchTuple) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(searchTuple);
            const document = yield this.collection.findOne({ _payload: searchTuple }, {
                sort: { time: -1 },
            });
            if (document == null) {
                return {
                    _isMuched: false,
                    _id: null,
                    _from: this.tupleSpaceName,
                    _payload: null,
                    _time: null,
                };
            }
            else {
                return Object.assign(document, {
                    _isMuched: true,
                });
            }
        });
    }
    insert(writeTuple) {
        const time = Date.now();
        const insertData = {
            _time: time,
            _from: this.tupleSpaceName,
            _payload: writeTuple,
        };
        return this.collection.insertOne(insertData);
    }
    delete(id) {
        return this.collection.deleteOne({ _id: id });
    }
    isMuch(targetTuple, searchTuple) {
        for (let operationKey in searchTuple) {
            if (!targetTuple[operationKey]) {
                return { isMuched: false, res: null };
            }
            else if (targetTuple[operationKey] != searchTuple[operationKey]) {
                return { isMuched: false, res: null };
            }
        }
        return { isMuched: true, res: targetTuple };
    }
}
exports.default = storageClient;
//# sourceMappingURL=mongoDBClient.js.map