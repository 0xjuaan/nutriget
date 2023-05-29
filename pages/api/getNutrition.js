const { LanguageServiceClient } = require('@google-cloud/language');
const client = new LanguageServiceClient({ keyFilename: '/Programming/my_code/nutri-get/applied-groove-387908-2dd8169c18c5.json' });
  
//Obligatory SQLite3 Database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databases/accounts.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the accounts database.');
});

export default function handler(req, res) {
    if (req.method == 'POST') {
      //Getting the user input from the form
      const text = req.body;

      //Sending the items to nutritionix
      fetch ('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        body: JSON.stringify({'query': text}), //JSON.string
        headers: { 
          'Content-Type': 'application/json',
          'x-app-id' : '4def7606',
          'x-app-key' : '36c464d782a41bc80e51f3fbfd32b9b3',
          'x-remote-user-id' : 0 
        }
      })
      .then(res => res.json())
      .then(data => {
        //Sending the useful data from the API response to the frontend
        var usefulData = []
        for (let i = 0; i < data.foods.length; i++) {
          usefulData.push({"name": data.foods[i].food_name, "calories": data.foods[i].nf_calories});
        }
        res.status(200).json({"data": usefulData})})
      }
      }