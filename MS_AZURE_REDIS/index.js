const mysql = require("mysql");
var fs = require("fs");
var path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const azureDbconnect = require("./azureDb");

//above are all import statements

var eqRoutes = require("./routes/eq");
var index = require("./routes/home");
var earthRoutes = require("./routes/earth");
var quakeRoutes = require("./routes/quake");
var quiz3Routes = require("./routes/quiz3");
//create express app
var app = express();

//app.use('/', express.static('/home/site/wwwroot', options));
app.use(bodyParser.json());
app.use("/", index);
app.use("/eq", eqRoutes);
app.use("/earth", earthRoutes);
app.use("/quake", quakeRoutes);
app.use("/quiz3", quiz3Routes);


app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

//configures the nodejs app
//const port = process.env.PORT || 1337;
app.listen(8080);

//console.log("Server running at http://localhost:%d", port);