const dbCassandra = require('./loadDataCassandra.js');
const dbPostgres = require('./loadDataPostgres.js');
const data = require('./generateData.js');

let db = 'postgres'; // choose between 'cassandra' and 'postgres'
let uploadType = 'data'; // choose between 'batch' for batch upload, 'data' for non-batch upload
let batchSize = 2000; // change the batch size to compare performance
let uploadSize = 10000000; // change the upload size

const loadBatchesToDb = (db) => {
  if (db === 'cassandra') {
    count = 0;
    const loadBatch = (count) => {
      if (count < uploadSize) {
        let insertStatements = data.createDataInserts(db, uploadType, batchSize);
        dbCassandra.loadBatchCassandra(insertStatements)
        .then((results) => {
          console.log(`insert ${count} successful`);
          count += batchSize;
          loadBatch(count);
        })
        .catch((error) => {
          console.log(`insert ${count} failed: ${error}`);
        });
      } else {
        console.log('upload complete');
        return;
      }
    }
    loadBatch(count);
  }
}

const loadDataToDb = (db) => {
    count = 0;
    const loadData = (count) => {
      if (count < uploadSize) {
        let dataParamsArray = data.createDataInserts(db, uploadType, batchSize);
        if (db === 'cassandra') {
          dbCassandra.loadDataCassandra(dataParamsArray)
          .then((results) => {
            console.log(`insert ${count} successful`);
            count += batchSize;
            loadData(count);
          })
          .catch((error) => {
            console.log(`insert ${count} failed: ${error}`);
          });
        } else if (db === 'postgres') {
          dbPostgres.runInsertPostgres(dataParamsArray, dbPostgres.columnsRelatedItems)
          .then((results) => {
            console.log(`insert ${count} successful`);
            count += batchSize;
            loadData(count);
          })
          .catch((error) => {
            console.log(`insert ${count} failed: ${error}`);
          });
        }
      } else {
        console.log('upload complete');
        return;
      }
    }
    loadData(count);
}

if (uploadType === 'batch') {
  loadBatchesToDb(db);
} else if (uploadType === 'data') {
  loadDataToDb(db);
}
