"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var url = process.env.MONGODB_URI || "mongodb://localhost/linda";
// const host = process.env.MONGO_HOST || "localhost";
console.log(url);
var db;
//v3.0から仕様が変わった？要調査
mongodb_1.MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log("Connected correctly to db");
    db = client.db();
});
var collection = function (name) {
    return db.collection(name);
};
exports.default = collection;
//# sourceMappingURL=mongoDB.js.map