const express = require('express');
const router = express.Router();
const azureConnect = require("../azureDb");
const { Connection, Request } = require("tedious");
const random = require('random');
const fs = require("fs");
const fastcsv = require("fast-csv");
var redis = require("redis");
const nconf = require('nconf');
const { request } = require('express');
const { start } = require('repl');
nconf.argv().env().file('keys.json');
//const port_redis = process.env.PORT || 6379;
var client = redis.createClient(nconf.get('redisPort') || '6379',
nconf.get('redisHost') || '127.0.0.1',
{
  'auth_pass': nconf.get('redisKey'),
  'return_buffers': true
}
).on('error', (err) => console.error('ERR:REDIS:', err));

client.on('connect', (err) => {
    console.log("Connected " + err)
});

router.get("/createTable", (req, res) => {
    var startTime = Date.now();
    var sql1 = "Drop table IF EXISTS earthquake";
        const request1 = new Request(sql1,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var start = Date.now();
                var sql2 = `CREATE TABLE earthquake (
                    time nvarchar(50) NOT NULL,
                    latitude FLOAT NOT NULL ,
                    longitude float NOT NULL,
                    depth float NOT NULL,
                    mag float NULL,
                    gap float NULL,
                    id nvarchar(50) NOT NULL,
                    place nvarchar(100) NOT NULL,
                    locationSource nvarchar(50) NOT NULL
                )`;
                const request2 = new Request(sql2,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`${rowCount} row(s) returned`);
                            var end = Date.now() - start;
                            var obj = {};
                            obj["timeTaken"] = end;
                            console.log(obj);
                            res.send(obj);
                        }
                    });
       
                 azureConnect.execSql(request2);
            }});
            
            azureConnect.execSql(request1);
    });


    router.get("/insertTable", (req, res) => {
        var startTime = Date.now();
        var i = 0;
        var result = [];

        insertData(0);
        function insertData(i){
                if(i==1000){
                    var end = Date.now() - start;
                    var obj ={};
                    obj["timeTaken"] = end;
                    res.send(obj);
                }
                var insertSql = `insert into earthquake values('2020-06-17T14:01:35.837Z',36.35695267,-97.36358643,2.782853603,2.57,34.80623055,'ok2020lwah','10 km NW of Perry', 'Oklahoma','ok')`;
                const request = new Request(insertSql,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`${rowCount} row(s) returned`);
                            //result.push(obj)
                        }
                    });

                    request.on('requestCompleted',function(){
                        insertData(++i);
                    });

                    azureConnect.execSql(request);
                   
                };

                
       
        
    });

    router.get("/insertInRedis", (req, res) => {
        var startTime = Date.now();
        var i = 0;
        var result = [];

        insertData(0);
        function insertData(i){
                if(i==1000){
                    var end = Date.now() - start;
                    var obj ={};
                    obj["timeTaken"] = end;
                    res.send(obj);
                }
                var insertSql = `insert into earthquake values('2020-06-17T14:01:35.837Z',36.35695267,-97.36358643,2.782853603,2.57,34.80623055,'ok2020lwah','10 km NW of Perry', 'Oklahoma','ok')`;
                const request = new Request(insertSql,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`${rowCount} row(s) returned`);
                            //result.push(obj)
                        }
                    });

                    request.on('requestCompleted',function(){
                        insertData(++i);
                    });

                    azureConnect.execSql(request);
                   
                };

                
       
        
    });

    router.get("/getQuakesGivenRange", (req, res) => {
        console.log("request received : " + req.query);
        var range = Number(req.query.range);
        var val1 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
        var val2 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
        var result = [];
        exesql(val1,val2,range,0);
        var totalstartTime = Date.now();
       function exesql(val1,val2,range,i) {
        const start = Date.now();
        var lowerLimit;
        var upperLimit;
        var obj = {};
        if(val1<=val2)
        {
            lowerLimit = val1;
            upperLimit = val2;
        }
        else{
            lowerLimit = val2;
            upperLimit = val1;
        }
        console.log(lowerLimit);
        console.log(upperLimit);
        var sql = `Select locationSource,place,time,mag from earthquake where latitude between ${lowerLimit} and ${upperLimit}`;
        if(i==range){
            var totalendTime = (Date.now() - totalstartTime);
            var timeObj = {};
            timeObj["totalTime"] = totalendTime;
            result.push(timeObj);
            res.send(result);
        }
        else {
        const request = new Request(sql,
            (err, rowCount, rows) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${rowCount} row(s) returned`);
                    obj["random"] = lowerLimit + "," + upperLimit;
                    obj["timeTaken"] = Date.now() - start;
                    //rows.push(obj);
                    obj["length"] = rowCount;
                    result.push(obj);
                }
            });
            request.on('requestCompleted', function () { 
                var val1 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                var val2 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                exesql(val1,val2,range,++i);
                 
            });
          
            azureConnect.execSql(request);
        }
    
    }  
    });

    router.get("/getFromRedis", (req,res) => {
        console.log("request received : " + req.query);
        var range = Number(req.query.range);
        var val1 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
        var val2 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
        var result = [];
        exesql(val1,val2,range,0);
        var totalstartTime = Date.now();
        function exesql(val1,val2,range,i) {
            const start = Date.now();
            var lowerLimit;
            var upperLimit;
            var obj = {};
            if(val1<=val2)
            {
                lowerLimit = val1;
                upperLimit = val2;
            }
            else{
                lowerLimit = val2;
                upperLimit = val1;
            }
            var label = lowerLimit + " " + upperLimit;
            var sql = `Select locationSource,place,time,mag from earthquake where latitude between ${lowerLimit} and ${upperLimit}`;
            if(i==range){
                var totalendTime = (Date.now() - totalstartTime);
                var timeObj = {};
                timeObj["totalTime"] = totalendTime;
                result.push(timeObj);
                res.send(result);
            }
            else {
                client.get(label, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                //if no match found
                if (data != null) {
                    var op = JSON.parse(data.toString());
                    obj["random"] = op.random;
                    obj["timeTaken"] = Date.now() - start;
                    obj["length"] = op.length;
                    obj["dbUsed"] = "Redis";
                    result.push(obj);
                    var val1 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                    var val2 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                    exesql(val1,val2,range,++i);
                } 
                else {
                    const request = new Request(sql,
                        (err, rowCount, rows) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                               // console.log(`${rowCount} row(s) returned`);
                                obj["random"] = lowerLimit + "," + upperLimit;
                                obj["timeTaken"] = Date.now() - start;
                                obj["length"] = rowCount;
                                obj["dbUsed"] = "AzureDatabase";
                                result.push(obj);
                                client.set(label, JSON.stringify(obj),redis.print);
                            }
                        });
                        request.on('requestCompleted', function () { 
                            var val1 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                            var val2 = (random.float(min = Number(req.query.lat_first),max = Number(req.query.lat_second))).toFixed(1);
                            exesql(val1,val2,range,++i);
                        });
                        azureConnect.execSql(request);
                    }
             });
        }
    
    }
    });
    module.exports = router;