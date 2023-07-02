import db from 'next/database'


export default function handler(req, res) {
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
        //TODO: Find a simpler way to do this using JS funcs
        for (let i = 0; i < data.length; i++) {
            meal_nutrition.calories += data[i].nutrition.nf_calories;
            meal_nutrition.total_fat += data[i].nutrition.nf_total_fat;
            meal_nutrition.total_carbohydrate += data[i].nutrition.nf_total_carbohydrate;
            meal_nutrition.sugars += data[i].nutrition.nf_sugars;
            meal_nutrition.protein += data[i].nutrition.nf_protein;
        }

      //Send the meal_nutrition_data to the meal table
        db.run( 
        'INSERT INTO meals (name, calories, total_fat, total_carbs, sugars, protein) VALUES (?, ?, ?, ?, ?, ?)',
        [meal_name, meal_nutrition.calories, meal_nutrition.total_fat, meal_nutrition.total_carbohydrate, meal_nutrition.sugars, meal_nutrition.protein],
        function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } 
        else {
            //Get the meal_id from the meal table
            const meal_id = this.lastID;

            //Send the meal id and time to the user_meals table (with the user_id too)
            db.run(
                'INSERT INTO user_meals (salt, meal_id, time_of_meal) VALUES (?, ?, ?)',
                [user_id, meal_id, date],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        res.status(500).json({ error: 'Internal server error' });
                    }
                    else {
                        res.status(200).json({ 'response': `meal "${meal_name}" added` });
                    }
                });
            }
        });      
    }
}

