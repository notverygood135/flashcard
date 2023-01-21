import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [mobileNavActive, setMobileNavActive] = useState(false);

    function handleClickToggle() {
        setMobileNavActive(prev => !prev);
        console.log(mobileNavActive);
    }

    return (
        <>
        <nav id={styles.navbar}>
            <h1 id={styles.logo}><NavLink to="/">Spark</NavLink></h1>
            <ul className={mobileNavActive ? styles.active : null} id={styles.navMenu}>
                <li className={styles.navItem}>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink to="/decks">Decks</NavLink>
                </li>
                <li className={styles.navItem} id={styles.navItemCreate}>
                    <NavLink to="/create">+ Create</NavLink>
                </li>
            </ul>
            <button className={mobileNavActive ? styles.active : null} id={styles.navToggle} onClick={handleClickToggle}>
                <div className={styles.buttonBar}></div>
                <div className={styles.buttonBar}></div>
                <div className={styles.buttonBar}></div>
            </button>
        </nav>
        </>
    )
}