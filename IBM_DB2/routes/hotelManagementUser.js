const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");
//var product = require("../public/javascripts/edit")
const db2connect = require("../db2Connection");


router.get("/getUserInfo", (req, res) => {
    //console.log("request received : " + req.query.eq_limit);
    var userName = req.query.USER_NAME;
    var sql = `Select * from HM_USER_DATA where "USER_NAME" = '${userName}'`;
    //  var sql2 = `Select * from ASSGN2 where "type"='earthquake' and "mag" is not null order by "mag" desc limit ?`;
    console.log(sql);
    db2connect.query(sql, [userName], function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            return res.send(result);
        }
    });
})


router.post("/addNewGuest", (req, res) => {
    console.log(req.data);
    var userName = req.body.USER_NAME;
    var firstName = req.body.FIRST_NAME;
    var lastName = req.body.LAST_NAME;
    var password = req.body.PASSWORD;
    var userRole = req.body.USER_ROLE;
    var hotelAccess = req.body.HOTEL_ACCESS;
    var email = req.body.EMAIL;
    var phone = req.body.PHONE;
    var streetAddress = req.body.STREET_ADDRESS;
    var city = req.body.CITY;
    var state = req.body.STATE;
    var zipcode = req.body.ZIPCODE;
    var ccn = req.body.CREDIT_CARD_NUM;
    var ccexp = req.body.CREDIT_CARD_EXP;
    var cctype = req.body.CARD_TYPE;

    var sql = `INSERT INTO HM_USER_DATA (USER_NAME, FIRST_NAME, LAST_NAME, PASSWORD, USER_ROLE, HOTEL_ACCESS, EMAIL, PHONE, STREET_ADDRESS, CITY, STATE, ZIPCODE, CREDIT_CARD_NUM, CREDIT_CARD_EXP, CARD_TYPE) VALUES ('sagar', 'roy', 'sagar_guest2', 'sagar123', 'Guest', 'ALL', 'sagar.giri@gmail.com', '1237337241', '404 border', 'arlington', 'texas', '76010', '4321245672346789', '04/23', 'VISA');;`

    // var sql = "SELECT \"id\", \"mag\", \"longitude\", \"place\", ((6371 * acos (cos ( radians(" + ipLat + ")) * cos(radians(\"latitude\" ) ) * cos( radians( \"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") ) * sin( radians( \"latitude\") ))))  AS \"distance_range\"   FROM ASSGN2 WHERE (6371 * acos ( cos ( radians( " + ipLat + ") ) * cos( radians(\"latitude\" ) )* cos( radians(\"longitude\" ) - radians(" + ipLong + ") ) + sin ( radians(" + ipLat + ") )  * sin( radians(\"latitude\")))) < " + ipRange + " ORDER BY \"mag\" DESC;";
    //var sql2 = `SELECT count(RANGE) as COUNT, range FROM  (select t.*, (case when t.mag between 0 and 1  then '0-1' when t.mag between 1 and 2 then '1-2' when t.mag between 2 and 3 then '2-3' when t.mag between 3 and 4 then '3-4' when t.mag between 4 and 5 then '4-5' when t.mag between 5 and 6 then '5-6' when t.mag between 6 and 7 then '6-7'  end) as range from ASSGN4 t where VARCHAR_FORMAT(time,'YYYY-MM-DD') > VARCHAR_FORMAT(sysdate-2,'YYYY-MM-DD')) group by range;`;
    //  console.log("ip_req: " + dateFrom + ", " + dateTo + ", " + ipMag);
    console.log(sql);
    db2connect.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.send("no results found!");
        } else {
            // console.log(result[0]);
            console.log(result);

            return res.send(result);
        }
    });
})

module.exports = router;