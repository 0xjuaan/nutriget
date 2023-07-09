import { getSession } from "/session";
import supabase from '/lib/supabaseClient.js';

export default async function handler(req, res) {
    if (req.method == 'POST') {

        const {calorieLimit, proteinGoal} = req.body;
        const {user} = getSession(req);

        const { data, error } = await supabase
            .from('calorie_limits')
            .update([
                { salt: user.id, calorie_limit: calorieLimit, protein_goal: proteinGoal },
            ])
            .eq('salt', user.id);

            if (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
            else {
                res.status(200).json({ 'response': 'calories set' });
            }
    }
}

        

