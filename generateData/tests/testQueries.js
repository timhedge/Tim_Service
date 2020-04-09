const cassandra = require('cassandra-driver');
const pgp = require('pg-promise')();


// cassandra tests

const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'relateditem'
});

// query for items within last 10% of dataset
const getItemTestCassandra = () => {

  let randomPartition = Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(1) + 1)) + 1;

  let startTime = Date.now();

  cassandraClient.execute('SELECT productname, imageurl FROM items WHERE partitiongroup = ? AND itemid > 9000000 LIMIT 6', [randomPartition], { prepare: true }) // gets pseudorandom items from top 10% of id range
  .then((result) => {
    let timer = Date.now() - startTime;
    console.log(`Cassandra select query complete.  Time to completion ${timer} ms.`);
  })
  .catch((error) => {
    console.log(error);
  });
}

getItemTestCassandra();

// postgres tests
const postgresClient = {
  host: 'localhost',
  port: 5433,
  database: 'relateditem',
  user: 'timhedge',
  password: ''
};

const db = pgp(postgresClient);

// query for items within last 10% of dataset
const getItemTestPostgres = () => {

  let randomIntArr = [];

  for (let i = 0; i < 6; i++) {
    let randomInt = Math.floor(Math.random() * (Math.floor(10000000) - Math.ceil(9000000) + 1)) + 9000000;
    randomIntArr.push(randomInt);
  }

  let startTime = Date.now();

  db.any('SELECT * FROM items WHERE id IN ($1, $2, $3, $4, $5, $6)', randomIntArr)
  .then((result) => {
    let timer = Date.now() - startTime;
    console.log(`Postgres select query complete.  Time to completion ${timer} ms.`);
  })
  .catch((error) => {
    console.log(error);
  });

}

//getItemTestPostgres();