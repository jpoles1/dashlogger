var db = require("./dash_control");
var express = require("express");
var app = express();
//Allow for HTTP POST parsing
var bodyParser = require("body-parser")
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//Setup rendering engine
var dotengine = require('express-dot-engine');
app.engine('dot', dotengine.__express);
app.set('views', './views');
app.set('view engine', 'dot');
//Setup router
global.router = express.Router();
global.BASE_URL = "";
global.PORT = 3000;
router.use(express.static("res"));
require("./routers/dash_router");
app.use(BASE_URL, router);
app.listen(PORT);
module.exports = app;
