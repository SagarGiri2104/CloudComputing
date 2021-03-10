const mysql = require('mysql');

var config = {
    host: 'earthquakes01.database.windows.net',
    user: 'sagar6582',
    password: 'Ocean@2012',
    database: 'Assignment2',
    port: 3306,
    ssl: true
};

const mysqlConnection = new mysql.createConnection(config);

mysqlConnection.connect(
    function(err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        } else {
            console.log("Connection established.");

        }
    });


module.exports = mysqlConnection;