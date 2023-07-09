
import db from 'next/database'
import supabase from '/lib/supabaseClient.js';

//Checking if something has the pattern of an email or not
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//A function that checks for the existence of a value in the database (returns true if it exists)
async function valueFound(value, type) {
    const { data, error } = await supabase
      .from('users')
      .select(type)
      .eq(type, value)

    if (error) {
        console.error(error.message);
        return false;
    }
    else {
        if (data.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
}
export default async function handler(req, res) {
    if (req.method == 'POST') {

        //Collecting data from payload
        const formData = req.body; //Collecting the 'payload'
        
        const {email, password} = formData; //Destructuring to get the form's values

            //The following checks if the registration form is valid (insta-checks)
            const {username} = formData; 
            if (username == '' && email == '' && password == '') {
                res.status(200).json({ 'response': 'Empty' });
            }
            else if (await valueFound(username, "username")) {
                res.status(400).json({ 'response': 'Username already exists' });
            }
            else if (!validateEmail(email) || email.length > 50 || email.length < 5) {
                res.status(400).json({ 'response': 'Invalid email address' });
            }
            else if (await valueFound(email, "email")) {
                res.status(400).json({ 'response': 'Email already exists' });
            }
            else if (username.length < 3 || username.length > 20) {
                res.status(400).json({'response': 'Username must be between 3 and 20 characters'});
            }
            else if (password.length < 6 || password.length > 20) {
                res.status(400).json({'response': 'Password must be between 6 and 20 characters'});
            }
            else{
                res.status(200).json({ 'response': "validForm" });
            }
    }
    
  };