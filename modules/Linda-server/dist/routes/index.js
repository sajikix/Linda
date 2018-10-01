"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const app_1 = require("../app");
router.get("/:tupleSpaceName/:operation", (req, res) => {
    if (req.params.tupleSpaceName === "_js") {
        switch (req.params.operation) {
            case "linda-client.js":
                fs.readFile(path.join(__dirname, "../../public/js/lindaClient.js"), (err, data) => {
                    if (err)
                        throw "fs read error";
                    res.setHeader("Content-Type", "application/javascript");
                    res.writeHead(200);
                    res.end(data);
                });
                break;
            default:
                res.send("no match file");
                break;
        }
    }
    else {
        const linda = app_1.default.get("linda");
        let ts = linda.tupleSpace(req.params.tupleSpaceName);
        switch (req.params.operation) {
            case "read":
                ts.read(req.query, (Data) => {
                    res.send(Data);
                });
                break;
            case "take":
                ts.take(req.query, (Data) => {
                    res.send(Data);
                });
                break;
            case "write":
                ts.write(req.query, (Data) => {
                    res.send(Data);
                });
                break;
            default:
                res.send('There is no operation like "' + req.params.operation + '"');
                break;
        }
    }
});
router.get("/", (req, res) => {
    res.render("index");
});
router.get("/:tupleSpaceName", (req, res) => {
    if (req.params.tupleSpaceName === "_js") {
        // 配布する静的ファイルの説明ページ
        res.render("jsIndex");
    }
    else {
        res.render("tupleSpace", {
            tupleSpaceName: req.params.tupleSpaceName,
            watchTuple: req.query,
        });
    }
});
router.post("/:tupleSpaceName", (req, res) => {
    const linda = app_1.default.get("linda");
    let ts = linda.tupleSpace(req.params.tupleSpaceName);
    let resData = ts.write(req.body);
    res.send({ status: "ok", tuple: resData });
});
exports.default = router;
//# sourceMappingURL=index.js.map