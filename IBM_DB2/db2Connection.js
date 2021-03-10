const ibmdb = require("ibm_db");

const connStr = "";

const db2connect = ibmdb.openSync(connStr);

module.exports = db2connect;