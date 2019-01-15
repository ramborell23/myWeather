// const db = require("../db/mapsDB")
const NorthAmerica = require ("./mapsDB/ne_50m_admin.json");

// console.log(NorthAmerica)
let rr;
rr = NorthAmerica
// console.log(rr)
// const returnNA = () => {
//     return rr
// }

function returnNA() {
  return NorthAmerica;
}


module.export = {
    returnNA,
};