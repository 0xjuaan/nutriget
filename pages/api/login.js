// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt');

//JSON Payload handler setup
import bodyParser from 'body-parser';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

//SQLite3 Database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databases/accounts.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the accounts database.');
});

//Handles the request sent to the api/login API Route (Are they valid?)
export default function handler(req, res) {
    if (req.method == 'POST') {

      //Collecting data from payload
      const formData = req.body; //Collecting the 'payload'
      const {email} = formData;
      const {password} = formData;


      db.all(`SELECT username FROM users WHERE email = ? and hash = ?`, (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json({ 'response': "granted" });
        }
    });
    }
    
  };
   
  db.close();