import db from 'next/database'

import { getSession } from "/session";
import { setSession } from "/session";
export default function handler(req, res) {
    if (req.method == 'POST') {

        const {calories} = req.body;
        const {protein} = req.body;
        console.log(calories);

        const {user} = getSession(req);

        db.run( 
            'INSERT INTO calorieLimits (salt, calorieLimit, proteinGoal) VALUES (?, ?, ?)',
            [user.id, calories, protein],
            function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal server error' });
            } 
            else {
                user.onboardNeeded = false;
                const session = { user }; //Setting the session as the user

                setSession(res, session);
                res.status(200).json({ user });
            }
        });      
    }
}

        

