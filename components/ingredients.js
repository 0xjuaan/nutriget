import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })

import { useState } from 'react';

//data == {"data":[{"name":"big mac","nutrition":{calories, protein, cholestrerol, etc}}]}

export default function Ingredients({data, function_on_click}) {
    //We pass in all the data
    const [selectedMeal, setSelectedMeal] = useState(null);

    const enter = (meal) => {
        setSelectedMeal(meal.id); //If the meal is not selected, select it
    }
    const leave = (meal) => {
        setSelectedMeal(null);
    }


    return (
        <div className={styles.list}>
            {data.map((value) => (
                <div key={value.id} id={value.id} className={`${styles.listCard} ${selectedMeal === value.id ? styles.selected : ''}}`} onMouseEnter={()=>enter(value)} onMouseLeave={()=>leave(value)}>
                    <div>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.nutrition.nf_calories)} Calories
                        {/*Extra Data*/}
                        {selectedMeal === value.id && (
                            <div>
                            <p>{Math.round(value.nutrition.nf_protein)}g Protein</p>
                            <p>{Math.round(value.nutrition.nf_total_fat)}g Fat</p>
                            <p>{Math.round(value.nutrition.nf_sugars)}g Sugar</p>
                            </div>
                        )}
                    </p>
                    </div>
                    <div className={styles.listCardRight}>
                        <button id={value.id} onClick={function_on_click} className={styles.delete}>Remove</button>
                    </div>
                </div>
            ))}
            <h4>Total Calories: {Math.round(data.reduce((total, value) => total + value.nutrition.nf_calories, 0))}</h4>
        </div>
    )
}