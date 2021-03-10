const mysql = require("mysql");
var fs = require("fs");
var path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
//const handleBars = require("express-handlebars");
const mysqlConnection = require("./connection");
const db2connect = require("./db2Connection");

//above are all import statements

var peopleRoutes = require("./routes/people");
var index1 = require("./routes/index");
//const index2 = require("./routes/index");
//const index3 = require("./routes/editData");

//create express app
var app = express();
var options = {
    index: 'index.html'
};
//app.use('/', express.static('/home/site/wwwroot', options));
app.use(bodyParser.json());
app.use("/", index1);
app.use("/people", peopleRoutes);
app.use("/project", index1);


app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

//configures the nodejs app
//const port = process.env.PORT || 1337;
app.listen(8080);
//console.log("Server running at http://localhost:%d", port);