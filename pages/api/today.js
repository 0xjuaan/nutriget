import db from 'next/database'

export default function handler(req, res) {
    if (req.method == 'POST') {
      //Getting the user input from the form
      const {user_id} = req.body;
      const date = new Date().toISOString();
      const start_of_day = (date.substring(0, 11) + '00:00:00.000Z');
      console.log(start_of_day)
      
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

              //Getting all the meals of this user
              db.all('SELECT * FROM meals WHERE meal_id IN (' + meal_ids.join(',') + ')', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal server error' });
                    return false;
                }
                else {
                //Now we have all the meals of this user in the last 24 hours
                  res.status(200).json({ rows });
                }
              });
            }
        }
        });
    }
}
