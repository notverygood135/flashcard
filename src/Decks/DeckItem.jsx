import { BiPencil, BiTrash, BiBook } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import styles from './Decks.module.css'

export default function DeckItem(props) {
    return (
        <>
            <div className={styles.deck}>
                <div className={styles.wrapper}>
                    <h3>Name</h3>
                    <h4>{props.name}</h4>
                </div>
                <div className={[styles.wrapper, styles.date].join(' ')}>
                    <h3>Created</h3>
                    <h4>{props.dateCreate}</h4>
                </div>
                <div className={[styles.wrapper, styles.date].join(' ')}>
                    <h3>Modified</h3>
                    <h4>{props.dateModify}</h4>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.deckButton}>
                        <NavLink id={styles.edit} to={`/decks/${props.id}`}><BiPencil /></NavLink>
                    </button>
                    <button className={styles.deckButton}>
                        <NavLink id={styles.edit} to={`/test/${props.id}`}><BiBook /></NavLink>
                    </button>
                    <button onClick={() => props.delete(props.id)} className={styles.deckButton} id={styles.delete}><BiTrash /></button>
                </div>
            </div>
        </>
    )
}