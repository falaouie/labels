const sqlite3 = require('sqlite3').verbose();
const dbName = 'dev_silver.db';
let sql;

// connect to db
const db = new sqlite3.Database(
  `./db/${dbName}`,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
  }
);

module.exports = { db };
