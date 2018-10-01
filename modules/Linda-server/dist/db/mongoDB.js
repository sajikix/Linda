"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = process.env.MONGODB_URI || "mongodb://localhost/linda";
// const host = process.env.MONGO_HOST || "localhost";
console.log(url);
let db;
//v3.0から仕様が変わった？要調査
mongodb_1.MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log(err);
    }
    console.log("Connected correctly to db");
    db = client.db();
});
let collection = function (name) {
    return db.collection(name);
};
exports.default = collection;
//# sourceMappingURL=mongoDB.js.map