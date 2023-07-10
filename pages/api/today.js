import supabase from '/lib/supabaseClient.js';

export default async function handler(req, res) {
    if (req.method == 'POST') {
      // Getting the user input from the form
      const {user_id} = req.body;
      const date = new Date().toISOString();
      const start_of_day = (date.substring(0, 11) + '00:00:00.000Z');

      // Getting all the meal_id from today
      const {data: meals, error} = await supabase
      .from('user_meals')
      .select('meal_id')
      .eq('salt', user_id)
      .gte('time_of_meal', start_of_day)
      .lte('time_of_meal', date)

      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (meals.length == 0) {
        res.status(400).json({ 'response': 'No meals' });
        return;
      }
      else {
        const meal_ids = meals.map((meal) => meal.meal_id);
        const {data: mealData, error2} = await supabase
        .from('meals')
        .select('*')
        .in('meal_id', meal_ids);

        if (error2) {
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        // Now we have all the meals of this user in the last 24 hours

        // initialising counters
        let counter_calories = 0;
        let counter_protein = 0;
        let counter_fat = 0;
        let counter_sugar = 0;

        mealData.forEach((meal) => {
          counter_calories += meal.calories;
          counter_protein += meal.protein;
          counter_fat += meal.total_fat;
          counter_sugar += meal.sugars;
        });

        // Arrange the data in a JSON object
        const data = {
          'calories': counter_calories,
          'protein': counter_protein,
          'fats': counter_fat,
          'sugars': counter_sugar
        }
          // Send the data to the frontend
          res.status(200).json({ data });
      }
    }
}
