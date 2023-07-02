// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt');
const saltRounds = 10;
//JSON Payload handler setup
import bodyParser from 'body-parser';
import db from 'next/database'
import { setSession } from "/session";


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

      //Collecting data from payload
      const formData = req.body; //Collecting the 'payload'
      const {username, email, password} = formData;

      

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
          [username, email, hash, salt],
          (err) => {
            if (err) {
              console.error(err.message);
              res.status(500).json({ error: 'Internal server error' });
            } 
            else {
                const user = { email: email, id: salt, onboardNeeded: true }; //The user id is their salt (since it's unique and not sensitive)
                const session = { user }; //Setting the session as the user object

                setSession(res, session);
                res.status(200).json({ user });
            }
        }); //End DB Run
      })

    }
  };