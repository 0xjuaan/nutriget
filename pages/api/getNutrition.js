require('dotenv').config(); // Load environment variables

export default function handler(req, res) {
    if (req.method == 'POST') {

      //Getting the user input from the form
      const text = req.body;

      //Sending the user input to nutritionix
      fetch ('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        body: JSON.stringify({'query': text}), 
        headers: { 
          'Content-Type': 'application/json',
          'x-app-id' : process.env.APP_ID,
          'x-app-key' : process.env.API_KEY,
          'x-remote-user-id' : 0 
        }
      })
      .then(res => res.json())
      .then(data => {
        //Sending the useful data from the API response to the frontend
        var usefulData = []
        for (let i = 0; i < data.foods.length; i++) {
          usefulData.push({"name": data.foods[i].food_name, "nutrition": data.foods[i], "id": Math.random()});
        }

        res.status(200).json({"data": usefulData})})
      .catch(err => console.log(err));
      }
}