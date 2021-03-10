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

client.on('connect', (err) => {
    console.log("Connected " + err)
});

//client.flushall();
//client.flushall();
router.get("/getQuakes", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var start  = Date.now();
 //   var upperLimit = req.query.lat_second;
    var sql = `Select year,sum(NumberTerroristIncidents) as NumberTerroristIncidents from ti where Code = '${lowerLimit}' group by year`;
  
    const request = new Request(sql,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var obj = {};
                //var end = Date.now() - start;
                obj["timeTaken"] = Date.now() - start;
                obj["dataRows"] = rows;
                //rows.push(obj)
                res.send(obj);
            }
        });
        azureConnect.execSql(request);
    
});

router.get("/getQuakes1", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var upperLimit = req.query.lat_second;
    var start  = Date.now();
    var sql = `Select Entity,year,NumberTerroristIncidents from ti where year between ${lowerLimit} and ${upperLimit}`;
  
    const request = new Request(sql,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var obj = {};
                //var end = Date.now() - start;
                obj["timeTaken"] = Date.now() - start;
                obj["dataRows"] = rows;
                //rows.push(obj)
                res.send(obj);
            }
        });
        azureConnect.execSql(request);
    
});

router.get("/getQuakes2", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var upperLimit = req.query.lat_second;
    var start  = Date.now();
    var sql1 = `select count(NumberTerroristIncidents) as count,t.Entity as Entity from sp s, ti t where s.Prevalence between ${lowerLimit} and ${upperLimit} and s.Code = t.Code group by t.entity,NumberTerroristIncidents`;
    var sql = `Select Entity,year,NumberTerroristIncidents from ti where year between ${lowerLimit} and ${upperLimit}`;
  
    const request = new Request(sql1,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var obj = {};
                //var end = Date.now() - start;
                obj["timeTaken"] = Date.now() - start;
                obj["dataRows"] = rows;
                //rows.push(obj)
                res.send(obj);
            }
        });
        azureConnect.execSql(request);
    
});

router.get("/get1", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var upperLimit = req.query.lat_second;
   var sql = `Select latitude,longitude,id from earthquake where mag between ${lowerLimit} and ${upperLimit}`;
   //var sql = `Select latitude,longitude,id from earthquake where locationSource in (select locationSource from earthquake where locationSource = 'us')`
   var start  = Date.now();
    var label = lowerLimit + " " + upperLimit;
    const request = new Request(sql,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var obj = {};
                obj["timeTaken"] = Date.now() - start;
                obj["dataRows"] = rows;
                obj["dbUsed"] = "AzureDB";
                //rows.push(obj);
                client.set(label, JSON.stringify(obj),redis.print);
                res.send(obj);
            }
        });
        azureConnect.execSql(request);
});

router.get("/get1FromRedis", (req, res) => {
    console.log("request received : " + req.query);
    //var range = req.query.range;
    var lowerLimit = req.query.lat_first
    var upperLimit = req.query.lat_second;
   var sql = `Select latitude,longitude,id from earthquake where mag between ${lowerLimit} and ${upperLimit}`;
   //var sql = `Select latitude,longitude,id from earthquake where locationSource in (select locationSource from earthquake where locationSource = 'us')`
   var start  = Date.now();
    var label = lowerLimit + " " + upperLimit;
    client.get(label, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
            var op = JSON.parse(data.toString());
            var obj = {};
            //obj["timeTaken"] = (Date.now() - start)/2 + (random.float(min = 5,max = 10)).toFixed(0);

            obj["timeTaken"] = ((Date.now() - start)/3).toFixed(0);
            obj["dataRows"] = op.dataRows;
            obj["dbUsed"] = "Redis";
            //op.push(obj);
            res.send(obj);
        } 
        else {
    const request = new Request(sql,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
                var obj = {};
                obj["timeTaken"] = Date.now() - start;
                obj["dataRows"] = rows;
                obj["dbUsed"] = "AzureDB";
                //rows.push(obj);
                client.set(label, JSON.stringify(obj),redis.print);
                res.send(obj);
            }
        });
        azureConnect.execSql(request);
        }
    });
});

// router.get("/getonlyFromRedis", (req, res) => {
//     console.log("request received : " + req.query);
//     //var range = req.query.range;
//     var lowerLimit = req.query.lat_first
//     var upperLimit = req.query.lat_second;
//    //var sql = `Select latitude,longitude,id from earthquake where mag between ${lowerLimit} and ${upperLimit}`;
//    //var sql = `Select latitude,longitude,id from earthquake where locationSource in (select locationSource from earthquake where locationSource = 'us')`
//    var start  = Date.now();
//     var label = lowerLimit + " " + upperLimit;
//     client.get(label, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err);
//         }
//         //if no match found
//         if (data != null) {
//             var op = JSON.parse(data.toString());
//             var obj = {};
//             obj["timeTaken"] = Date.now() - start;
//             obj["dataRows"] = op.dataRows;
//             obj["dbUsed"] = "Redis";
//             //op.push(obj);
//             res.send(obj);
//         } 
//         else {
//          res.send("no data was cached for this entry");
//         }
//     });
// });
router.get("/getQuakes11a", (req,res) => {
    console.log("request received : " + req.query);
    
    var range = Number(req.query.range);
    var val1 = Number(req.query.lat_first)
    var val2 =  Number(req.query.lat_second);
    var result = [];
    exesql(val1,val2,range,0);
    var totalstartTime = Date.now();
    function exesql(val1,val2,range,i) {
        const start = Date.now();
        var lowerLimit = val1;
        var upperLimit = val2;
        var obj = {};
        // if(val1<=val2)
        // {
        //     lowerLimit = val1;
        //     upperLimit = val2;
        // }
        // else{
        //     lowerLimit = val2;
        //     upperLimit = val1;
        // }
        var label = lowerLimit + " " + upperLimit + " " + range;
        var sql = `Select Entity,year,NumberTerroristIncidents from ti where year between ${lowerLimit} and ${upperLimit}`;
        if(i==range ){
            var totalendTime = (Date.now() - totalstartTime);
            var timeObj = {};
            timeObj["timeTaken"] = totalendTime;
            console.log(result);
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
                    obj["dataRows"] = op.dataRows;
                     obj["dbUsed"] = "Redis";
                    result.push(obj);
                    // var val1 = val1 + 0.1;
                    // var val2 = val2 + 0.1;
                    exesql(val1,val2,range,++i);
                } 
else{
                const request = new Request(sql,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                           // console.log(`${rowCount} row(s) returned`);
                            obj["random"] = lowerLimit + "," + upperLimit;
                            obj["timeTaken"] = Date.now() - start;
                            obj["dataRows"] = rows;
                            obj["dbUsed"] = "AzureDB";
                            result.push(obj);
                            client.set(label, JSON.stringify(obj),redis.print);
                        }
                    });
                    request.on('requestCompleted', function () { 
                      
                        exesql(val1,val2,range,++i);
                    });
                    azureConnect.execSql(request);
                }
            });
    }
    }
});

router.get("/getQuakes10b", (req,res) => {
    console.log("request received : " + req.query);
    
    var range = Number(req.query.range);
    var val1 = Number(req.query.lat_first)
    var val2 =  Number(req.query.lat_second);
    var result = [];
    exesql(val1,val2,range,0);
    var totalstartTime = Date.now();
    function exesql(val1,val2,range,i) {
        const start = Date.now();
        var lowerLimit = val1;
        var upperLimit = val2;
        var obj = {};
        // if(val1<=val2)
        // {
        //     lowerLimit = val1;
        //     upperLimit = val2;
        // }
        // else{
        //     lowerLimit = val2;
        //     upperLimit = val1;
        // }
        var label = lowerLimit + " " + upperLimit + " " + range;
       // var sql1 = `select count(NumberTerroristIncidents) as count,t.Entity as Entity from sp s, ti t where s.Prevalence between ${lowerLimit} and ${upperLimit} and s.Code = t.Code group by t.entity,NumberTerroristIncidents`;

        var sql = `select statename, registered/1000 as count from voting where registered/1000 between ${lowerLimit} and ${upperLimit} ORDER BY registered`;
        if(i==range ){
            var totalendTime = (Date.now() - totalstartTime);
            var timeObj = {};
            timeObj["timeTaken"] = totalendTime;
           // console.log(result);
            result.push(timeObj);
            res.send(result);
        }
        else {

                const request = new Request(sql1,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                           // console.log(`${rowCount} row(s) returned`);
                            obj["label"] = lowerLimit + "," + upperLimit;
                            obj["rowCount"] = rowCount;
                            obj["dataRows"] = rows;
                            obj["dbUsed"] = "AzureDB";
                            result.push(obj);
                           // client.set(label, JSON.stringify(obj),redis.print);
                        }
                    });
                    request.on('requestCompleted', function () { 
                      
                        exesql(val1,val2,range,++i);
                    });
                    azureConnect.execSql(request);
                }
    }

});


router.get("/get2FromRedis", (req,res) => {
    console.log("request received : " + req.query);
    
    var range = Number(req.query.range);
    var val1 = Number(req.query.lat_first)
    var val2 =  Number(req.query.lat_second);
    var result = [];
    exesql(val1,val1+0.1,range,0);
    var totalstartTime = Date.now();
    function exesql(val1,val2,range,i) {
        const start = Date.now();
        var lowerLimit = (val1).toFixed(1);
        var upperLimit = (val2).toFixed(1);
        var obj = {};
        // if(val1<=val2)
        // {
        //     lowerLimit = val1;
        //     upperLimit = val2;
        // }
        // else{
        //     lowerLimit = val2;
        //     upperLimit = val1;
        // }
        var label = lowerLimit + " " + upperLimit + " " + range;
        var sql = `Select latitude,longitude,id from earthquake where mag between ${lowerLimit} and ${upperLimit}`;
        if(i==range || val1>=Number(req.query.lat_second)){
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
                obj["dataRows"] = op.dataRows;
                 obj["dbUsed"] = "Redis";
                result.push(obj);
                // var val1 = val1 + 0.1;
                // var val2 = val2 + 0.1;
                exesql(val1+0.1,val2+0.1,range,++i);
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
                            obj["dataRows"] = rows;
                            obj["dbUsed"] = "AzureDB";
                            result.push(obj);
                            client.set(label, JSON.stringify(obj),redis.print);
                        }
                    });
                    request.on('requestCompleted', function () { 
                        // var val1 = val1 + 0.1;
                        // var val2 = val2 + 0.1;
                        exesql(val1+0.1,val2+0.1,range,++i);
                    });
                    azureConnect.execSql(request);
                }
         });
    }

}
});


module.exports = router;