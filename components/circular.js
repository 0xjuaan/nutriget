import styles from './circular.module.css';

export default function CircularProgress({percentage}) {
    return (
        <div className={styles.container}>
            <div id="circle" className={styles.circularProgress}>
                <div className={styles.innerCircle}>
                    <h1>{percentage}%</h1>
                </div>
            </div>
        </div>
    );
}