//configuration for MySql DB
const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    multipleStatements: true,
    port: 50000
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log("Connection Failed", err);
    }
})

module.exports = mysqlConnection;