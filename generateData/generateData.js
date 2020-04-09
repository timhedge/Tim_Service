const faker = require('faker');

let totalCount = 0;

const createDataInserts = (dbType, uploadType, batchSize) => {
  let batchCount = 1;
  let imageNum = 0;
  let partitionId = 1;
  let insertsArray = [];

  while (batchCount <= batchSize) {
    let randomProduct = faker.commerce.productName();

    if (dbType === 'cassandra' && uploadType === 'batch') {
      let insertParams = {
        query: (`INSERT INTO items (partitiongroup, itemid, imageurl, productname) VALUES (?,?,?,?)`),
        params: [partitionId, totalCount, `https://arrtozone-sdc-images.s3.us-east-2.amazonaws.com/randomImages/randomPhoto_${imageNum}.jpg`, randomProduct]
      }

      insertsArray.push(insertParams);

    } else if (dbType === 'cassandra' && uploadType === 'data') {
      let insertParams = [partitionId, totalCount, `https://arrtozone-sdc-images.s3.us-east-2.amazonaws.com/randomImages/randomPhoto_${imageNum}.jpg`, randomProduct];

      insertsArray.push(insertParams);

    } else if (dbType === 'postgres' && uploadType === 'data') {
      let insertParams = { productname: randomProduct, imageurl: `https://arrtozone-sdc-images.s3.us-east-2.amazonaws.com/randomImages/randomPhoto_${imageNum}.jpg` };

      insertsArray.push(insertParams);
    }

    batchCount++;
    totalCount++;

    if (imageNum < 999) {
      imageNum++;
    } else {
      imageNum = 0;
    }

    if (partitionId <= 1000) {
      partitionId++;
    } else {
      partitionId = 1;
    }

  }

  return insertsArray;

}

module.exports = { createDataInserts }