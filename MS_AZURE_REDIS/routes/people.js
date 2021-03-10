const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");
//var product = require("../public/javascripts/edit")
const db2connect = require("../db2Connection");


var path = require('path');
var fs = require('fs');
var student;
fs.readFile('names.json', 'utf8', function(err, data) {
    if (err) throw err;
    student = JSON.parse(data);
});

function done() {
    console.log(array);
}

router.get("/showinfo", (req, res) => {
    db2connect.query("SELECT \"latitude\", \"longitude\" FROM PMZ02895.ASSGN2 Where \"magType\" = 'ml'", (err, rows, fields) => {
        if (!err) {
            //   console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})

// router.get("/showall", (req, res) => {
//     db2connect.query("SELECT * FROM PMZ02895.ASSGN2", (err, rows, fields) => {

//         if (!err) {
//             res.send(rows);
//             console.log(rows);
//         } else {
//             console.log(err);
//         }
//     });
// })

// router.get("/showall", (req, res) => {     
//     res.send(student);    
// });


// router.post('/delete', function(req, res, next) {
//     //  return res.send('Ok');
//     console.log('request received:', req.body);
//     var columnName = req.body.columnName;
//     var value = req.body.columnValue;
//     var sql = 'DELETE FROM PMZ02895.ASSGN1 where Name =?';

//     var query = mysqlConnection.query(sql, [value], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.send("no results found!");
//         } else {
//             return res.send(result);
//         }
//     });
//     //res.send('received the data.');
// });

router.post('/delete', function(req, res, next) {
    //  return res.send('Ok');
    console.log('request received:', req.body);
    var columnName = req.body.columnName;
    var value = req.body.columnValue;
    for (var i = 0; i < student.length; i++) {

        if (value == student[i].Name) {    
            delete student[i];
            res.send(student);    
        }   
    }
    //res.send('received the data.');
});

// router.post('/updateinfo', function(req, res, next) {
//     var cope = req.body;
//     //  return res.send('Ok');
//     console.log('request received:', req.body);
//     var columnName = req.body.columnName;
//     var columnType = req.body.columnType;
//     var value = req.body.columnValue;
//     var sql = 'UPDATE PMZ02895.ASSGN1 SET ' + columnType + ' =?  where Name =? ';

//     var query = mysqlConnection.query(sql, [value, columnName], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.send("no results found!");
//         } else {
//             return res.send(result);
//         }
//     });
//     //res.send('received the data.');
// });

router.post('/updateinfo', function(req, res, next) {
    var cope = req.body;
    //  return res.send('Ok');
    console.log('request received:', req.body);
    var columnName = req.body.columnName;
    var columnType = req.body.columnType;
    var value = req.body.columnValue;
    var jsonColumn;
    if (columnType == "Room") {
        jsonColumn = student[0];
    } else if (columnName == "Room") {
        jsonColumn = student[i].Room;
    }

    for (var i = 0; i < student.length; i++) {

        if (columnName == student[i].Room) {    
            if (columnType == "Name") {
                student[i].Name = value;
            }
            res.send(student[i]);    
        }   
    }
});
//res.send('received the data.');

// router.post('/search', function(req, res, next) {
//     var cope = req.body;
//     //  return res.send('Ok');
//     console.log('request received:', req.body);
//     var columnName = req.body.columnName;
//     var value = req.body.columnValue;
//     var sql = 'SELECT * FROM PMZ02895.ASSGN1 where ' + columnName + '=?';
//     if (columnName == "SalaryFrom") {
//         sql = 'SELECT * FROM assgn1 where Salary >= ' + Number(value) + ';';
//     }
//     if (columnName == "SalaryTo") {
//         sql = 'SELECT * FROM assgn1 where Salary <= ' + Number(value) + ';';
//     }

//     var query = mysqlConnection.query(sql, [value], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.send("no results found!");
//         } else {
//             return res.send(result);
//         }
//     });
//     //res.send('received the data.');
// });

router.post('/search', function(req, res, next) {

    //  return res.send('Ok');
    console.log('request received:', req.body);
    var columnName = req.body.columnName;
    var value = req.body.columnValue;
    var a = _.filter(student, function(e) {

        return (columnName < e.Room) && (e.Room < value);
    })
    res.send(a);
});

module.exports = router;