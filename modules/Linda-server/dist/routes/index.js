"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var app_1 = require("../app");
router.get("/:tupleSpaceName/:operation", function (req, res) {
    if (req.params.tupleSpaceName === "_js") {
        switch (req.params.operation) {
            case "linda-client.js":
                fs.readFile(path.join(__dirname, "../../public/js/lindaClient.js"), function (err, data) {
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
        var linda = app_1.default.get("linda");
        var ts = linda.tupleSpace(req.params.tupleSpaceName);
        switch (req.params.operation) {
            case "read":
                ts.read(req.query, function (Data) {
                    res.send(Data);
                });
                break;
            case "take":
                ts.take(req.query, function (Data) {
                    res.send(Data);
                });
                break;
            case "write":
                ts.write(req.query, function (Data) {
                    res.send(Data);
                });
                break;
            default:
                res.send('There is no operation like "' + req.params.operation + '"');
                break;
        }
    }
});
router.get("/", function (req, res) {
    res.render("index");
});
router.get("/:tupleSpaceName", function (req, res) {
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
router.post("/:tupleSpaceName", function (req, res) {
    var linda = app_1.default.get("linda");
    var ts = linda.tupleSpace(req.params.tupleSpaceName);
    var resData = ts.write(req.body);
    res.send({ status: "ok", tuple: resData });
});
exports.default = router;
//# sourceMappingURL=index.js.map