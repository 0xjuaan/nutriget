import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Ingredients(data) {
    return (
        <div className={styles.grid}>
            {data.data.map((value) => (
                <div className={styles.card}>
                    <h2 className={inter.className}>
                        {value.name}
                    </h2>
                    <p className={inter.className}>
                        {value.calories}
                    </p>
                </div>
            ))}
        </div>
    )
}