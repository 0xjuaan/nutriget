// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt');
const saltRounds = 10;
//JSON Payload handler setup
import bodyParser from 'body-parser';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

//Handles the request sent to the api/login API Route (Are they valid?)
export default function handler(req, res) {
    if (req.method == 'POST') {

      //SQLite3 Database setup
      const sqlite3 = require('sqlite3').verbose();
      const db = new sqlite3.Database('./databases/accounts.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the accounts database.');
      });


      //Collecting data from payload
      const formData = req.body; //Collecting the 'payload'
      const {username} = formData;
      const {email} = formData;
      const {password} = formData;
      

      //Function to salt and hash the password, and return the salt+hash
      async function hashPassword(plainPassword) {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return { salt, hash };
      }

      hashPassword(password)
      .then(({salt, hash}) => {
        db.run( //Start DB Run
          'INSERT INTO users (username, email, hash, salt) VALUES (?, ?, ?, ?)',
          [username, email, salt, hash],
          (err) => {
            if (err) {
              console.error(err.message);
              res.status(500).json({ error: 'Internal server error' });
            } 
            else {
              res.status(200).json({ 'response': `registered ${username}` });
            }
        }); //End DB Run
      })

    }
  };

