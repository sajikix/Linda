"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryDB_1 = require("../db/memoryDB");
class storageClient {
    constructor(tupleSpaceName) {
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
    get(tuple) {
        let i;
        for (i = this.tupleSpace.length; i > 0; i--) {
            let result = this.isMuch(this.tupleSpace[i - 1], tuple);
            if (result.isMuched) {
                let resData = Object.assign(this.tupleSpace[i - 1], {
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
    }
    insert(writeTuple) {
        const time = Date.now();
        const insertData = {
            _time: time,
            _from: this.tupleSpaceName,
            _payload: writeTuple,
            _id: this.tupleSpace.length,
        };
        this.tupleSpace.push(insertData);
        return insertData;
    }
    //update() {}
    delete(id) {
        this.tupleSpace.splice(id, 1);
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
//# sourceMappingURL=memoryClient.js.map