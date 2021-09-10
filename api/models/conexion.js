const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "ohunm00fjsjs1uzy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "l67pthx670nedjcp",
  password: "e35m8lagrul0r1ca",
  database: "dl6z4zdd3x0l5sn2",
});

module.exports = connection;
