const mysql = require("mysql");
var fs = require("fs");
var path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

//above are all import statements

var eqRoutes = require("./routes/eq");
var index = require("./routes/home");

var hmIndex = require("./routes/hotelManagementUser");

//create express app
var app = express();

//app.use('/', express.static('/home/site/wwwroot', options));
app.use(bodyParser.json());
app.use("/", index);
app.use("/", hmIndex);
app.use("/eq", eqRoutes);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

//configures the nodejs app
//const port = process.env.PORT || 1337;
app.listen(8080);

//console.log("Server running at http://localhost:%d", port);