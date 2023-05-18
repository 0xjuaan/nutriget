import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


export default function MainButton({page, title, description}) {
    return (
    <Link
        href={`/${page}`}
        className={styles.card}
        rel="noopener noreferrer">

        <h2 className={inter.className}>
            {title} <span>-&gt;</span>
        </h2>

        <p className={inter.className}>
            {description}
        </p>
    </Link>
    )
}

//export default function BigButton({page, title, description, image})