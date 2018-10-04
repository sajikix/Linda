"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var socketIo = require("socket.io");
var http_1 = require("http");
var linda_1 = require("./linda");
var routes_1 = require("./routes");
dotenv.load();
var PORT = Number(process.env.PORT) || 3000;
var app = express();
var server = http_1.createServer(app);
var io = socketIo.listen(server);
var linda = new linda_1.default();
exports.linda = linda;
app.set("views", "views/");
app.set("view engine", "pug");
app.use(express.static("public/"));
linda.listen(server, io);
server.listen(PORT, function () {
    console.log("server listeninig at port:" + PORT);
});
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());
//catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    err.status = 404;
    next(err);
});
//error handling
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
app.use("/", routes_1.default);
app.set("linda", linda);
console.log(linda.tupleSpaces || "none");
exports.default = app;
//# sourceMappingURL=app.js.map