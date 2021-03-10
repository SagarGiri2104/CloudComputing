const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");
//var product = require("../public/javascripts/edit")
const db2connect = require("../db2Connection");

router.get("/getBig5", (req, res) => {
    console.log("request received : " + req.query.eq_limit);
    var limit = req.query.eq_limit;
    var sql = "Select * from ASSGN2 where \"type\"='earthquake' and \"mag\" is not null order by \"mag\" desc limit ?";
    var sql2 = `Select * from ASSGN2 where "type"='earthquake' and "mag" is not null order by "mag" desc limit ?`;
    console.log(sql2);
    db2connect.query(sql2, [limit], function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            return res.send(result);
        }
    });
})

router.get("/getEqInRange", (req, res) => {
    var ipLat = req.query.ip_lat;
    var ipLong = req.query.ip_long;
    var ipRange = req.query.ip_range;
    console.log("ip_req: " + ipLat + ", " + ipLong + ", " + ipRange);
    var sql = "SELECT \"id\", \"latitude\", \"longitude\", \"place\", ((6371 * acos (cos ( radians(" + ipLat + ")) * cos(radians(\"latitude\" ) ) * cos( radians( \"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") ) * sin( radians( \"latitude\") ))))  AS \"distance_range\"   FROM ASSGN2 WHERE (6371 * acos ( cos ( radians( " + ipLat + ") ) * cos( radians(\"latitude\" ) )* cos( radians(\"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") )  * sin( radians(\"latitude\")))) < " + ipRange + " ORDER BY \"distance_range\";";
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            return res.send(result);
        }
    });
})


router.post("/getEqBnDates", (req, res) => {
    console.log(req.data);
    var dateFrom = req.body.ip_date_from;
    dateFrom = dateFrom.split('T')[0];
    var dateTo = req.body.ip_date_to;
    dateTo = dateTo.split('T')[0];
    var ipMag = req.body.ip_mag;
    var sql = `select * from ASSGN4 where mag < ${ipMag} and VARCHAR_FORMAT(time, 'YYYY-MM-DD') between '${dateFrom}' and '${dateTo}'`;
    console.log("ip_req: " + dateFrom + ", " + dateTo + ", " + ipMag);
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            return res.send(result);
        }
    });
})

router.post("/getRecentEqCountBnMag", (req, res) => {
    console.log(req.data);
    var ipRecentDays = req.body.ip_recent_days;
    var sql = `SELECT count(*) as COUNT, range FROM  (select a.*, (case when a.mag between 0 and 1  then '0-1' when a.mag between 1 and 2 then '1-2' when a.mag between 2 and 3 then '2-3' when a.mag between 3 and 4 then '3-4' when a.mag between 4 and 5 then '4-5' when a.mag between 5 and 6 then '5-6' when a.mag between 6 and 7 then '6-7'  end) as range from ASSGN4 a where VARCHAR_FORMAT(time,'YYYY-MM-DD') > VARCHAR_FORMAT(sysdate-${ipRecentDays},'YYYY-MM-DD')) group by range;`;
    //var sql2 = `SELECT count(RANGE) as COUNT, range FROM  (select t.*, (case when t.mag between 0 and 1  then '0-1' when t.mag between 1 and 2 then '1-2' when t.mag between 2 and 3 then '2-3' when t.mag between 3 and 4 then '3-4' when t.mag between 4 and 5 then '4-5' when t.mag between 5 and 6 then '5-6' when t.mag between 6 and 7 then '6-7'  end) as range from ASSGN4 t where VARCHAR_FORMAT(time,'YYYY-MM-DD') > VARCHAR_FORMAT(sysdate-2,'YYYY-MM-DD')) group by range;`;
    //  console.log("ip_req: " + dateFrom + ", " + dateTo + ", " + ipMag);
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            return res.send(result);
        }
    });
})

router.post("/getLargestEqInRange", (req, res) => {
    console.log(req.data);
    var ipLat = req.body.ip_lat;
    var ipLong = req.body.ip_long;
    var ipRange = req.body.ip_range;
    var sql = "SELECT \"id\", \"mag\", \"longitude\", \"place\", ((6371 * acos (cos ( radians(" + ipLat + ")) * cos(radians(\"latitude\" ) ) * cos( radians( \"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") ) * sin( radians( \"latitude\") ))))  AS \"distance_range\"   FROM ASSGN2 WHERE (6371 * acos ( cos ( radians( " + ipLat + ") ) * cos( radians(\"latitude\" ) )* cos( radians(\"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") )  * sin( radians(\"latitude\")))) < " + ipRange + " ORDER BY \"mag\" DESC;";
    //var sql2 = `SELECT count(RANGE) as COUNT, range FROM  (select t.*, (case when t.mag between 0 and 1  then '0-1' when t.mag between 1 and 2 then '1-2' when t.mag between 2 and 3 then '2-3' when t.mag between 3 and 4 then '3-4' when t.mag between 4 and 5 then '4-5' when t.mag between 5 and 6 then '5-6' when t.mag between 6 and 7 then '6-7'  end) as range from ASSGN4 t where VARCHAR_FORMAT(time,'YYYY-MM-DD') > VARCHAR_FORMAT(sysdate-2,'YYYY-MM-DD')) group by range;`;
    //  console.log("ip_req: " + dateFrom + ", " + dateTo + ", " + ipMag);
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            console.log(result[0]);

            return res.send(result[0]);
        }
    });
})

router.post("/getEqCountInRange", (req, res) => {
    console.log(req.data);
    var ipLat = req.body.ip_lat;
    var ipLong = req.body.ip_long;
    var ipRange = req.body.ip_range;
    var sql = "SELECT \"id\", \"mag\", \"longitude\", \"place\", ((6371 * acos (cos ( radians(" + ipLat + ")) * cos(radians(\"latitude\" ) ) * cos( radians( \"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") ) * sin( radians( \"latitude\") ))))  AS \"distance_range\"   FROM ASSGN2 WHERE (6371 * acos ( cos ( radians( " + ipLat + ") ) * cos( radians(\"latitude\" ) )* cos( radians(\"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") )  * sin( radians(\"latitude\")))) < " + ipRange + " ORDER BY \"mag\" DESC;";
    //var sql2 = `SELECT count(RANGE) as COUNT, range FROM  (select t.*, (case when t.mag between 0 and 1  then '0-1' when t.mag between 1 and 2 then '1-2' when t.mag between 2 and 3 then '2-3' when t.mag between 3 and 4 then '3-4' when t.mag between 4 and 5 then '4-5' when t.mag between 5 and 6 then '5-6' when t.mag between 6 and 7 then '6-7'  end) as range from ASSGN4 t where VARCHAR_FORMAT(time,'YYYY-MM-DD') > VARCHAR_FORMAT(sysdate-2,'YYYY-MM-DD')) group by range;`;
    //  console.log("ip_req: " + dateFrom + ", " + dateTo + ", " + ipMag);
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            // console.log(result[0]);
            console.log(result.length);

            return res.send(result);
        }
    });
})


router.post("/getCountBn2EqLocInRange", (req, res) => {
    console.log(req.data);
    var ipLat1 = req.body.ip_lat1;
    var ipLong1 = req.body.ip_long1;
    var ipLat2 = req.body.ip_lat2;
    var ipLong2 = req.body.ip_long2;
    var ipRange = req.body.ip_range;

    var sql4 = `SELECT count(distinct loc1.id) As count1,count(distinct loc2.id) AS count2 FROM ASSGN4 loc1, ASSGN4 loc2
    where (6371*acos(cos(radians(${ipLat1})) * cos(radians(loc1.LATITUDE))* cos(radians(loc1.LONGITUDE) - radians(${ipLong1}))+ sin(radians(${ipLat1}))* sin(radians(loc1.LATITUDE)))) < ${ipRange}
    and (6371*acos(cos(radians(${ipLat2}))* cos(radians(loc2.LATITUDE))* cos(radians(loc2.LONGITUDE) -radians(${ipLong2}))+ sin(radians(${ipLat2})) * sin(radians(loc2.LATITUDE)))) < ${ipRange}`;

    console.log(sql4);
    console.log("\n");
    db2connect.query(sql4, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            // console.log(result[0]);
            // console.log(result.length);
            return res.send(result);
        }
    });
})




module.exports = router;