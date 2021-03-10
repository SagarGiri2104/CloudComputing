const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");
//var product = require("../public/javascripts/edit")

var path = require('path');

'use strict';

   
const fs = require('fs');

   
fs.readFile('names.json', (err, data) => {     
            if (err) throw err;     
            var student = JSON.parse(data);    
            console.log(student.length);
        }

             // console.log(student[0].Name);

           
        for (var i = 0; i < student.length; i++) {

                
            if (req.query.name == student[i].Name) {

                      
                console.log(student[i]);      
                res.render('home_image', { data: student[i] });    
            }

               
        }

        function done() {
            console.log(array);
        }

        router.get("/showall", (req, res) => {

            mysqlConnection.query("SELECT * FROM PMZ02895.ASSGN1", (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    console.log(err);
                }
            });
        })

        router.post('/delete', function(req, res, next) {
            //  return res.send('Ok');
            console.log('request received:', req.body);
            var columnName = req.body.columnName;
            var value = req.body.columnValue;
            var sql = 'DELETE FROM PMZ02895.ASSGN1 where Name =?';

            var query = mysqlConnection.query(sql, [value], function(err, result) {
                if (err) {
                    console.error(err);
                    return res.send("no results found!");
                } else {
                    return res.send(result);
                }
            });
            //res.send('received the data.');
        });

        router.get('/edit', function(req, res, next) {
            //  return res.send('Ok');
            // res.sendFile(path.join(__dirname + '/../public/html/edit_user.html'));

            console.log('request received:', req.body);
            var value = req.query.Name;
            var sql = 'SELECT * FROM PMZ02895.ASSGN1 where Name =?'
            var query = mysqlConnection.query(sql, [value], function(err, result) {
                if (err) {
                    console.error(err);
                    return res.send("no results found!");
                } else {
                    return res.send(result);
                }
            });
            //res.send('received the data.');
        });

        router.post('/updateinfo', function(req, res, next) {
            var cope = req.body;
            //  return res.send('Ok');
            console.log('request received:', req.body);
            var columnName = req.body.columnName;
            var columnType = req.body.columnType;
            var value = req.body.columnValue;
            var sql = 'UPDATE PMZ02895.ASSGN1 SET ' + columnType + ' =?  where Name =? ';

            var query = mysqlConnection.query(sql, [value, columnName], function(err, result) {
                if (err) {
                    console.error(err);
                    return res.send("no results found!");
                } else {
                    return res.send(result);
                }
            });
            //res.send('received the data.');
        });

        router.post('/search', function(req, res, next) {
            var cope = req.body;
            //  return res.send('Ok');
            console.log('request received:', req.body);
            var columnName = req.body.columnName;
            var value = req.body.columnValue;
            var sql = 'SELECT * FROM PMZ02895.ASSGN1 where ' + columnName + '=?';
            if (columnName == "SalaryFrom") {
                sql = 'SELECT * FROM assgn1 where Salary >= ' + Number(value) + ';';
            }
            if (columnName == "SalaryTo") {
                sql = 'SELECT * FROM assgn1 where Salary <= ' + Number(value) + ';';
            }

            var query = mysqlConnection.query(sql, [value], function(err, result) {
                if (err) {
                    console.error(err);
                    return res.send("no results found!");
                } else {
                    return res.send(result);
                }
            });
            //res.send('received the data.');
        });

        module.exports = router;