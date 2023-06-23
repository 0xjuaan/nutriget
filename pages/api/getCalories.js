import db from 'next/database'

import { getSession } from "/session";

export default function handler(req, res) {
    if (req.method == 'POST') {

        const {calorieLimit} = req.body;
        const {user} = getSession(req);
        const user_id = user.id;

        //Check if the user already has a calorie limit set
        db.all(
            'SELECT * FROM calorieLimits WHERE salt = ?',
            [user_id],
            (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal server error' });
                }
                else {
                    if (rows.length == 0) {
                        //If the user doesn't have a calorie limit set, insert one
                        //insertCalorieLimit(user, calorieLimit, res);
                        res.status(500).json({ 'response': 'No calorie limit set' }); 
                    }
                    else {
                        //If the user already has a calorie limit set, update it
                        res.status(200).json({'calorieLimit': rows[0].calorieLimit });
                    }
                }
            }
        );
    }
}

        

