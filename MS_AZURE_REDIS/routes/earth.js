const express = require('express');
const router = express.Router();
const azureConnect = require("../azureDb");
const { Connection, Request } = require("tedious");
const random = require('random');
var redis = require("redis");
const nconf = require('nconf');
const { DateTime } = require('mssql');
nconf.argv().env().file('keys.json');
//const port_redis = process.env.PORT || 6379;
var client = redis.createClient(nconf.get('redisPort') || '6379',
nconf.get('redisHost') || '127.0.0.1',
{
  'auth_pass': nconf.get('redisKey'),
  'return_buffers': true
}
).on('error', (err) => console.error('ERR:REDIS:', err));

////const connection = require('../azureDb');
client.on('connect', (err) => {
    console.log("Connected " + err)
});

router.get("/getQuakes", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var upperLimit = req.query.lat_second;
    var sql = `Select locationSource,place,time,mag from earthquake where latitude between ${lowerLimit} and ${upperLimit}`;
  
    const request = new Request(sql,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                res.send(rows);
            }
        });
        azureConnect.execSql(request);
    
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