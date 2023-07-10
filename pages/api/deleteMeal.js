import supabase from '/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method == 'POST') {

    //Getting the user input from the form
    const {user_id, meal_id} = req.body;

    const {error} = await supabase
        .from('user_meals')
        .delete()
        .eq('salt', user_id)
        .eq('meal_id', meal_id);

    if (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
    else {
        const {error2} = await supabase
            .from('meals')
            .delete()
            .eq('meal_id', meal_id);

        if (error2) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        else {  
            return res.status(200).json({ 'response': `meal ${meal_id} deleted` });
        }
    }
    }
}

