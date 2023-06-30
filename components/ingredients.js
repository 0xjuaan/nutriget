import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
//data is an object: {"data":[{"name":"big mac","nutrition":{calories, protein, cholestrerol, etc}}]}

export default function Ingredients({data, function_on_click}) {
    //We pass in all the data
    
    return (
        <div className={styles.list}>
            {data.map((value) => (
                <div key={value.id} id={value.id} className={styles.listCard}>
                    <div>
                    <h2 className={inter.className}>
                        {value.name+value.id}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.nutrition.nf_calories)} Calories
                    </p>
                    </div>
                    <div className={styles.listCardRight}>
                        <button id={value.id} onClick={function_on_click} className={styles.delete}>Remove</button>
                    </div>
                </div>
            ))}
            <h4>Calories: {Math.round(data.reduce((total, value) => total + value.nutrition.nf_calories, 0))}</h4> {/*Total Calories*/}
        </div>
    )
}