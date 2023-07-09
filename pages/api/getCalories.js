import db from 'next/database'
import supabase from '/lib/supabaseClient.js';
import { getSession } from "/session";

export default async function handler(req, res) {
    if (req.method == 'GET') {

        const {user} = getSession(req);
        
        const {data, error} = await supabase
            .from('calorie_limits')
            .select('calorie_limit, protein_goal')
            .eq('salt', user.id);

        if (error) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.status(200).json({ 'calorieLimit': data[0].calorie_limit, 'proteinGoal': data[0].protein_goal });
        }
        }
        
}

        

