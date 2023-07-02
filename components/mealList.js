import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })
//data is an array: [{meal_id: 8 (later more like f2cea6c), calories: 619, total_fat: 37.4, total_carbs: 47.76, sugars: 10.28, name:}]

export default function MealList({data, function_on_click}) {
    const [selectedMeal, setSelectedMeal] = useState(null);

    const handleCardClick = (meal) => {
        if (meal.meal_id === selectedMeal) {
            setSelectedMeal(null);
        } else {
            setSelectedMeal(meal.meal_id);
        }
    }
    //data is an array of meal objects
    if (data == "None") {
        return (<p>You have no meals. <Link href="/scratch">Click here to add your first meal</Link></p>)
    }
    return (
        <div className={styles.list}>
            {data.map((value) => (
                <div key={value.meal_id} id={value.meal_id} className={styles.listCard}>
                    <div>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.calories)} Calories
                    </p>
                    </div>
                    <div className={styles.listCardRight}>
                        <Image alt="add meal" width={65} height={65} src='/add_sign.png'></Image>
                        <button id={value.meal_id} onClick={(e) => {e.stopPropagation(); function_on_click;}} className={styles.delete}>Remove</button>
                        <button onClick={()=> handleCardClick(value)}>More Data</button>
                    </div>
                    {selectedMeal === value.meal_id && 
                        <div className={styles.details}>
                            <p>Protein: {value.protein}g</p>
                            <p>Fat: {value.total_fat}g</p>
                            <p>Sugar: {value.sugars}g</p>
                        </div>
                    }       
                </div>
            ))}
        </div>
    )
}