const cassandra = require('cassandra-driver');
const executeConcurrent = cassandra.concurrent.executeConcurrent;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'relateditem'
});

async function loadBatchCassandra (queries) {
  await client.batch(queries, { prepare: true });
  console.log('Batches loaded on cluster');
}

async function loadDataCassandra (inserts) {
  const query = `INSERT INTO items (partitiongroup, itemid, imageurl, productname) VALUES (?,?,?,?)`
  await executeConcurrent(client, query, inserts, { concurrencyLevel: 100 });
  console.log('Data loaded on cluster');
}


module.exports = { loadBatchCassandra, loadDataCassandra }



