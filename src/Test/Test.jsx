import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Test.module.css';
import TestCard from './TestCard';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export default function Test() {
    const deckID = useParams().id;
    const [deckData, setDeckData] = useState({});
    const [cards, setCards] = useState([]);
    const [cardsData, setCardsData] = useState({});
    const [currentCard, setCurrentCard] = useState(0);

    const cardList = cards.map(card => 
        <TestCard 
            key={card.id} 
            id={card.id}
            deckID={card.deckid}
            question={cardsData[card.id]?.question}
            answer={cardsData[card.id]?.answer}
            examples={cardsData[card.id]?.examples}
        />
    );

    useEffect(() => {
        getDeck(deckID);
        getDeckCards(deckID);
    }, []);

    function getDeck(deckID) {
        fetch('http://localhost:3001/decks')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data = data.filter(deck => deck.id === deckID);
            setDeckData({name: data[0].name, description: data[0].description});
        });
    }

    function getDeckCards(deckID) {
        let cardsData = {};
        fetch(`http://localhost:3001/cards/${deckID}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.sort(() => Math.random() - 0.5);
            setCards(data);
            data.forEach(card => 
                cardsData[card.id] = {question: card.question, answer: card.answer, examples: card.examples});
            setCardsData(cardsData);
        });
    }

    function handleClick(direction) {
        setCurrentCard(prevCard => prevCard + direction);
    }

    return (
        <>
        <section id={styles.testContainer}>
            <div className={styles.testButtonWrapper}>
                {currentCard > 0 && 
                <button onClick={() => handleClick(-1)} className={styles.testButton}>
                    <BiChevronLeft />
                </button>}
            </div>
            {cardList.length > 0 ? cardList[currentCard] : <h3>There aren't any cards in this deck yet...</h3>}
            <div className={styles.testButtonWrapper}>
                {currentCard < cardList.length - 1 &&
                <button onClick={() => handleClick(1)} className={styles.testButton}>
                    <BiChevronRight />
                </button>}
            </div>
        </section>
        </>
    )
}