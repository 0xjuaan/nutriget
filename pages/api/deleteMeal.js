import db from 'next/database'

export default function handler(req, res) {
    if (req.method == 'POST') {

      //Getting the user input from the form
      const {user_id, meal_id} = req.body;
      //Delete the meal from the user_meals table
        db.run('DELETE FROM user_meals WHERE salt = ? AND meal_id = ?',
        [user_id, meal_id],
        (err) => {
            if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
            }
        else {
            res.status(200).json({ 'response': `meal ${meal_id} deleted` });
        }
        });

        //Delete the meal from the meals table
        db.run('DELETE FROM meals WHERE meal_id = ?',
        [user_id, meal_id],
        (err) => {
            if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
            }
        else {
            res.status(200).json({ 'response': `meal ${meal_id} deleted` });
        }
        });
    }
}

