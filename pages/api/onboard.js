import db from 'next/database'
import supabase from '/lib/supabaseClient.js';

import { getSession } from "/session";
import { setSession } from "/session";


export default async function handler(req, res) {
    if (req.method == 'POST') {

        const {calories} = req.body;
        const {protein} = req.body;

        const {user} = getSession(req);
        
        const { data, error } = await supabase
            .from('calorie_limits')
            .insert([
                { salt: user.id, calorie_limit: calories, protein_goal: protein },
            ]);

            if (error) {
                res.status(500).json({ error: 'Internal server error' });
            } 
            else {
                user.onboardNeeded = false;
                const session = { user: user }; //Setting the session as the user
                setSession(res, session);
                res.status(200).json({ user });
            }
    }
}

        

