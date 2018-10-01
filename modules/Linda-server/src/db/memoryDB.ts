import { Memory } from "../interfaces";

let memoryDB: Memory = {
  test: [{ _id: 0, time: Date.now(), type: "init" }],
};

export default memoryDB;
