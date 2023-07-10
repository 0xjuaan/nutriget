import supabase from '/lib/supabaseClient.js';

export default async function handler(req, res) {
    if (req.method == 'POST') {

      // Getting the user input from the form
      const {user_id} = req.body;

      //Getting all the meal_id of the user
      const {data: meals, error} = await supabase
        .from('user_meals')
        .select('meal_id')
        .eq('salt', user_id);
      
      if (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
      else {
        if (meals.length == 0) {
          res.status(400).json({ 'response': 'No meals' });
        }
        else {

          const meal_ids = meals.map(meal => meal.meal_id);
          
          // Getting all meals of this user
          const {data: mealData, error2} = await supabase
            .from('meals')
            .select('*')
            .in('meal_id', meal_ids);

          if (error2) {
            console.error(error2.message);
            res.status(500).json({ error: 'Internal server error' });
          }
          else {
            res.status(200).json( mealData );
          }
        }
      }
    }
}
