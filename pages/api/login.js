import db from 'next/database'
import { setSession } from "/session";
const bcrypt = require('bcrypt');

export default function login(req, res) {
  // authenticate user
  if (req.method == 'POST') {
    
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400).json({ 'response': 'Empty' });
    }

    db.all('SELECT hash,salt FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
          console.error(err.message);
          return false;
      }
      else {
          if (rows.length == 0) {
            console.log("HI G")
            res.status(400).json({ 'response': 'Invalid email' });
              return false;
          }
          else {
            const salt = rows[0].salt;
            const hashed_stuff = rows[0].hash;

            bcrypt.hash(password, salt)
            .then((test_hash) => {

              if (test_hash == hashed_stuff){
                const user = { email: email, id: salt }; //The user id is their salt (since it's unique and not sensitive)
                const session = { user }; //Setting the session as the user

                setSession(res, session);
                res.status(200).json({ user });
              }
              return true;
            });
          }
      }
    });
  
  
  }
}