import { useState, useEffect } from "react";
import DeckItem from './DeckItem';
import styles from './Decks.module.css';

export default function Decks() {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        getDecks();
    }, []);

    const deckList = [...decks].map(deck => {
        return (
        <DeckItem 
            key={deck.id}
            id={deck.id}
            name={deck.name}
            dateCreate={deck.datecreate} 
            dateModify={deck.datemodify} 
            delete={deleteDeck}
        />)
    });

    function getDecks() {
        fetch('http://localhost:3001/decks')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setDecks(data.reverse());
        });
    }

    function deleteDeck(id) {
        fetch(`http://localhost:3001/decks/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getDecks();
        })
    }

    return (
        <>
        <section className={styles.deckList}>
            {deckList.length ? deckList : 'Waiting for something to happen?'}
        </section>
        </>
    )
}