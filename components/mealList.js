import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
//data is an array: [{meal_id: 8, calories: 619, total_fat: 37.4, total_carbs: 47.76, sugars: 10.28, name:}]

export default function MealList({data}) {
    //We pass in all the data
    return (
        <div className={styles.list}>
            {data.map((value) => (
                <div id={value.meal_id} className={styles.listCard}>
                    <div>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.calories)} Calories
                    </p>
                    </div>
                    <div className={styles.listCardRight}>
                        <button id={value.name} className={styles.delete}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
        

    )
}