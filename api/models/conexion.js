const mysql = require("mysql");
const config = {
  host: "ohunm00fjsjs1uzy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "l67pthx670nedjcp",
  password: "e35m8lagrul0r1ca",
  database: "dl6z4zdd3x0l5sn2",
  connectionLimit: 0,
  queueLimit: 0,
  waitForConnection: true,
  multipleStatements: true,
};

// const connection = mysql.createConnection({
//   multipleStatements: true,
//   host: "ohunm00fjsjs1uzy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   user: "l67pthx670nedjcp",
//   password: "e35m8lagrul0r1ca",
//   database: "dl6z4zdd3x0l5sn2",
// });

const connection = mysql.createPool(config);

module.exports = connection;
