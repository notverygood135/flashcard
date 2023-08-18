import { NavLink } from 'react-router-dom';
import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
        <section>
            <div className={styles.container}>
                <div className={styles.textWrapper}>
                    <h1>Studying is easier than ever with Spark</h1>
                    <button className={styles.textButton}><NavLink to="/create">Create</NavLink></button>   
                </div>
                <div className={styles.imageWrapper}>
                    <img src="/vecteezy_teen-girl-using-computer-laptop-to-self-learning-online_1308520.jpg" alt="woman studying" className={styles.image}/>
                </div>
            </div>
        </section>
        </>
    )
}