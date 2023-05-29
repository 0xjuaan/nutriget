import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
//data is an object: {"data":[{"name":"big mac","calories":562.83}]}

export default function Ingredients(data) {
    return (
        <div className={styles.grid}>
            {data.data.map((value) => (
                <div className={styles.card}>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {Math.round(value.calories)} Calories
                    </p>
                </div>
            ))}
        </div>
    )
}