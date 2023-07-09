import supabase from '../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method == 'POST') {

      //Getting the user input from the form
      const {user_id, meal_name, date, data} = req.body;
      
      //Process the meal data (sum nutrients across all foods)
        var meal_nutrition = {
            "calories": 0,
            "total_fat": 0,
            "total_carbohydrate": 0,
            "sugars": 0,
            "protein": 0,
        };

        //Sum the nutrients across all foods in the meal
        for (let i = 0; i < data.length; i++) {
            meal_nutrition.calories += data[i].nutrition.nf_calories;
            meal_nutrition.total_fat += data[i].nutrition.nf_total_fat;
            meal_nutrition.total_carbohydrate += data[i].nutrition.nf_total_carbohydrate;
            meal_nutrition.sugars += data[i].nutrition.nf_sugars;
            meal_nutrition.protein += data[i].nutrition.nf_protein;
        }

      //Send the meal_nutrition_data to the meal table
        const {mealData, error} = await supabase
            .from('meals')
            .insert([
                { name: meal_name, calories: meal_nutrition.calories, total_fat: meal_nutrition.total_fat, total_carbs: meal_nutrition.total_carbohydrate, sugars: meal_nutrition.sugars, protein: meal_nutrition.protein },
            ]);

        if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            const meal_id = mealData[0].id;

            const {error2} = await supabase
                .from('user_meals')
                .insert([
                    { salt: user_id, meal_id: meal_id, time_of_meal: date },
                ]);
            if (error2) {
                console.error(error2.message);
                res.status(500).json({ error: 'Internal server error' });
            }
            else {
                res.status(200).json({ 'response': `meal "${meal_name}" added` });
            }
            
        }
    }
}