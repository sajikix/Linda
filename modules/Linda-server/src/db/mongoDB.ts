import { MongoClient, Db, Collection } from "mongodb";

const url: string = process.env.MONGODB_URI || "mongodb://localhost/linda";
// const host = process.env.MONGO_HOST || "localhost";
console.log(url);
let db: Db;

//v3.0から仕様が変わった？要調査
MongoClient.connect(
  url,
  (err, client) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected correctly to db");
    db = client.db();
  }
);

let collection = function(name: string): Collection {
  return db.collection(name);
};

export default collection;
