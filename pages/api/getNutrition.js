//const { LanguageServiceClient } = require('@google-cloud/language');
//const client = new LanguageServiceClient({ keyFilename: '/Programming/my_code/nutri-get/applied-groove-387908-2dd8169c18c5.json' });


/*async function extractEntities(text) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    const [result] = await client.analyzeEntities({ document });
    const entities = result.entities.map(entity => entity.name);
    return entities;
  }*/
  
  

  
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

      //Converting it into a list of items
      //const entities = extractEntities(text);

      const entities = [text]
      //Sending the list of items to edamam
      fetch ('https://api.edamam.com/api/nutrition-details?app_id=f93901b3&app_key=250416ac1f75a3a9d6a2bdd2c501c0ef&beta=false&force=false', {
        method: 'POST',
        body: JSON.stringify({'title': 'food', 'ingr': entities}), //JSON.string
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(data => {
        console.log(`data: ${data}`)
        res.status(200).json(data)})
      }
      }