import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
//data is an object: {"data":[{"name":"big mac","calories":562.83}]}

export default function Ingredients({data, function_on_click}) {
    console.log(JSON.stringify(data))
    return (
        <div className={styles.list}>
            {data.map((value) => (
                <div id={value.name} className={styles.listCard}>
                    <div>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.calories)} Calories
                    </p>
                    </div>
                    <div className={styles.listCardRight}>
                        <button id={value.name} onClick={function_on_click} className={styles.delete}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    )
}