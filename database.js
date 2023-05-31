const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "databases/accounts.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      hash TEXT,
      salt TEXT,
    )`, (err) => {
      if (err) {
        console.log('Table already exists.');
      } else {
        console.log('Table created successfully.');
      }
    });
  }
});

module.exports = db;
