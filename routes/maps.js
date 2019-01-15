// import NorthAmerica from "ne_50m_admin.json";
// import db from "db / mapsDB.js"
var express = require("express");
var router = express.Router();
const db = require("../db/mapsQueries")
/* GET home page. */
console.log(db)
router.get("/", function(req, res, next) {
 
  let data = "wow"
  console.log(data)
  .then(data => {
    console.log(data)
    res.send({ data });
  }).catch(err => {
    return next(err);
  });
});

module.exports = router;
