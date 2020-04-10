const pgp = require('pg-promise')();

const postgresClient = {
  host: 'localhost',
  port: 5433,
  database: 'relateditem',
  user: 'timhedge',
  password: ''
};

const db = pgp(postgresClient);

// query for random items within last 10% of dataset
const getSixItems = (callback) => {

  let randomIntArr = [];

  for (let i = 0; i < 6; i++) {
    let randomInt = Math.floor(Math.random() * (Math.floor(10000000) - Math.ceil(9000000) + 1)) + 9000000;
    randomIntArr.push(randomInt);
  }

  db.any('SELECT * FROM items WHERE id IN ($1, $2, $3, $4, $5, $6)', randomIntArr)
  .then((result) => {
    callback(null, result);
  })
  .catch((error) => {
    callback(err, null);
  });

}

module.exports = { getSixItems };

// Old MySQL database
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "35.239.102.42", //host.docker.internal
//   user: "root",
//   password: "password", //hratx47hratx47
//   database: "pirate_data"
// });

// const getAllItems = callback =>
//   connection.query("SELECT * FROM ArrtoZone_Inventory;", (err, result) => {
//     if (err) callback(err, null);
//     else callback(null, result);
//   });

// connection.connect();

// module.exports = { connection, getAllItems };
