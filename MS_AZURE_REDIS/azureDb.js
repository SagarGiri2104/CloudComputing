const { Connection, Request } = require("tedious");


// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "sagar6582", // update me
            password: "Ocean@2012",
            // update me
        },
        type: "default"
    },
    server: "earthquakes01.database.windows.net",
    pool: {
        idleTimeoutMillis: 32000
        //max: 100
    },
    stream: true,
    parseJSON: true, // update me
    options: {
        database: "Assignment2", //update me
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true

    }
};

const connection = new Connection(config);
//config.options.rowCollectionOnRequestCompletion

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        //queryDatabase();
    }
});

module.exports = connection;