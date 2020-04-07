const pgp = require('pg-promise')();

const client = {
  host: 'localhost',
  port: 5433,
  database: 'relateditem',
  user: 'timhedge',
  password: ''
};

const db = pgp(client);

const columnsRelatedItems = new pgp.helpers.ColumnSet([
  'productname',
  'imageurl'
], {table: 'items'});

let dataArr = [
  {productname: 'hello', imageurl: 'url'}
]

const insert = (data, columns) => {
  return pgp.helpers.insert(data, columns);
}

async function runInsertPostgres (data, columns) {
  await db.none(insert(data, columns));
}

module.exports = { columnsRelatedItems, runInsertPostgres }

