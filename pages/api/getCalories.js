import db from 'next/database'

import { getSession } from "/session";

export default function handler(req, res) {
    if (req.method == 'GET') {

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
                        res.status(500).json({ 'response': 'No calorie limit set' }); 
                    }
                    else {
                        res.status(200).json({'calorieLimit': rows[0].calorieLimit, 'proteinGoal': rows[0].proteinGoal });
                    }
                }
            }
        );
    }
}

        

