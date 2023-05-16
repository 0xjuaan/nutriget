
//Obligatory SQLite3 Database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databases/accounts.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the accounts database.');
});

//Checking if something has the pattern of an email or not
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//A function that checks for the existence of a value in the database (returns true if it exists)
function valueFound(value, type) {
    db.all('SELECT ? FROM users WHERE ? = ?',[type, type, value], (err, rows) => {
        if (err) {
            console.error(err.message);
            return false;
        }
        else {
            if (rows.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    });

}
export default function handler(req, res) {
    if (req.method == 'POST') {

        //Collecting data from payload
        const formData = req.body; //Collecting the 'payload'
        const {username} = formData; //Destructuring to get the form's values
        const {email} = formData;
        const {password} = formData;

        //Checking if email is of correct format
        if (username == '' && email == '' && password == '') {
            res.status(200).json({ 'response': 'Empty' });
        }
        if (valueFound(username, "username")) {
            res.status(400).json({ 'response': 'Username already exists' });
        }
        else if (!validateEmail(email) || email.length > 50 || email.length < 5) {
            res.status(400).json({ 'response': 'Invalid email address' });
        }
        else if (valueFound(email, "email")) {
            res.status(400).json({ 'response': 'Email already exists' });
        }
        else if (username.length < 3 || username.length > 20) {
            res.status(400).json({'response': 'Username must be between 3 and 20 characters'});
        }
        else if (password.length < 5 || password.length > 20) {
            res.status(400).json({'response': 'Password must be between 5 and 20 characters'});
        }
        else{
            res.status(200).json({ 'response': "validForm" });
        }

        
    
    }
    
  };