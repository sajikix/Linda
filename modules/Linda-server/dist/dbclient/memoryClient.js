"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memoryDB_1 = require("../db/memoryDB");
var storageClient = /** @class */ (function () {
    function storageClient(tupleSpaceName) {
        this.tupleSpaceName = tupleSpaceName;
        if (memoryDB_1.default[tupleSpaceName]) {
            this.tupleSpace = memoryDB_1.default[tupleSpaceName];
            console.log(tupleSpaceName + " is already exist");
        }
        else {
            this.tupleSpace = memoryDB_1.default[tupleSpaceName] = [
                { _id: 0, time: Date.now(), type: "init" },
            ];
            console.log(tupleSpaceName + " is created");
        }
    }
    // .map使って書き直せる説
    storageClient.prototype.get = function (tuple) {
        var i;
        for (i = this.tupleSpace.length; i > 0; i--) {
            var result = this.isMuch(this.tupleSpace[i - 1], tuple);
            if (result.isMuched) {
                var resData = Object.assign(this.tupleSpace[i - 1], {
                    _isMuched: true,
                });
                return resData;
            }
        }
        if (i == 0) {
            return {
                _isMuched: false,
                _id: null,
                _from: this.tupleSpaceName,
                _payload: null,
                _time: null,
            };
        }
    };
    storageClient.prototype.insert = function (writeTuple) {
        var time = Date.now();
        var insertData = {
            _time: time,
            _from: this.tupleSpaceName,
            _payload: writeTuple,
            _id: this.tupleSpace.length,
        };
        this.tupleSpace.push(insertData);
        return insertData;
    };
    //update() {}
    storageClient.prototype.delete = function (id) {
        this.tupleSpace.splice(id, 1);
    };
    storageClient.prototype.isMuch = function (targetTuple, searchTuple) {
        for (var operationKey in searchTuple) {
            if (!targetTuple[operationKey]) {
                return { isMuched: false, res: null };
            }
            else if (targetTuple[operationKey] != searchTuple[operationKey]) {
                return { isMuched: false, res: null };
            }
        }
        return { isMuched: true, res: targetTuple };
    };
    return storageClient;
}());
exports.default = storageClient;
//# sourceMappingURL=memoryClient.js.map