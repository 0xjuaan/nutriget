import db from 'next/database'

export default function handler(req, res) {
    if (req.method == 'POST') {
      //Getting the user input from the form
      const {user_id} = req.body;
      const date = new Date().toISOString();
      const start_of_day = (date.substring(0, 11) + '00:00:00.000Z');

      //Getting today's meals
      db.all('SELECT meal_id FROM user_meals WHERE salt = ? AND datetime(time_of_meal) >= datetime(?) AND datetime(time_of_meal) <= datetime(?)',
      [user_id, start_of_day, date], (err, rows) => {
        if (err) {
            console.error(err.message);
            return false;
        }
        else {
            if (rows.length == 0) {
              res.status(400).json({ 'response': 'No meals' });
                return false;
            }
            else {
            //Listing all the meal ids of this user
              var meal_ids = [];
              for (let i = 0; i < rows.length; i++) {
                meal_ids.push(rows[i].meal_id);
              }

              //Getting all the meal data of today's meals
              db.all('SELECT * FROM meals WHERE meal_id IN (' + meal_ids.join(',') + ')', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal server error' });
                    return false;
                }
                else {
                //Now we have all the meals of this user in the last 24 hours

                //Setting up counters for each macro
                let counter_calories = 0
                let counter_protein = 0
                let counter_fat = 0
                let counter_sugar = 0
                
                console.log(counter_fat)
                
                //Add up all the macros of the meals 
                for (let i = 0; i < rows.length; i++) {
                  counter_calories += rows[i].calories;
                  counter_protein += rows[i].protein;
                  counter_fat += rows[i].total_fat;
                  counter_sugar += rows[i].sugars;
                  console.log(rows[i].calories)
                }

                //Arrange the data in a JSON object
                const data = {
                  'calories': counter_calories,
                  'protein': counter_protein,
                  'fats': counter_fat,
                  'sugars': counter_sugar
                }

                  //Send the data to the frontend
                  res.status(200).json({ data });
                }
              });
            }
        }
        });
    }
}
