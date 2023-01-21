import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Card from './Card';
import styles from './Create.module.css';

export default function Create() {
    const [deckData, setDeckData] = useState({name: '', description: ''});
    const [cards, setCards] = useState([]);
    const [cardsData, setCardsData] = useState({});
    let deckID = nanoid();

    const cardList = cards.map(card => 
        <Card 
            key={card.id} 
            id={card.id}
            question={card.question}
            answer={card.answer}
            examples={card.examples}
            deleteCardElement={deleteCardElement} 
            handleCardDataChange={handleCardDataChange}
        />
    );

    function handleDeckDataChange(event) {
        setDeckData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleCardDataChange(event, id) {
        setCardsData(prevData => ({
            ...prevData,
            [id]: {...prevData[id], [event.target.name]: event.target.value}
        }));
    }

    function addCard() {
        let id = nanoid();
        setCards(prevCards => [...prevCards, {key: id, id: id}]);
        setCardsData(prevCardsData => ({
            ...prevCardsData,
            [id]: {question: '', answer: '', examples: ''}
        }));
    }

    function deleteCardElement(event, id) {
        event.stopPropagation();
        setCards(prevCards => prevCards.filter(card => card.id !== id));
        setCardsData(prevCardsData => {
            delete(prevCardsData[id]);
            return prevCardsData;
        });
    }

    function createDeck(deckID) {
        let id = deckID;
        let name = deckData.name;
        let dateCreate = new Date().toISOString().split('T')[0];
        let dateModify = dateCreate;
        let description = deckData.description;
        fetch('http://localhost:3001/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, description, dateCreate, dateModify })
        })
        .then(response => {
            return response.text();
        });
    }

    function createCards(deckID) {
        let data = {};
        for (let key in cardsData) {
            data[key] = { 
                deckid: deckID,
                question: cardsData[key].question,
                answer: cardsData[key].answer,
                examples: cardsData[key].examples
            };
        }
        fetch('http://localhost:3001/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data })
        })
        .then(response => {
            return response.text();
        });
    }

    function create() {
        createDeck(deckID);
        createCards(deckID);
    }

    return (
        <>
        <section className={styles.deckCreate}>
            <form>
                <input 
                    type="text" 
                    placeholder="Deck name" 
                    value={deckData.name} 
                    name="name"
                    onChange={handleDeckDataChange}
                />
            </form>
            <form>
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={deckData.description}
                    name="description"
                    onChange={handleDeckDataChange}
                />
            </form>
            {cardList.length > 0 ? cardList : <h3>There aren't any cards in this deck yet...</h3>}
            <button className={styles.addCardButton} onClick={addCard}>Add card</button>
            <button type="submit" onClick={create}>Submit</button>
        </section>
        </>
    )
}