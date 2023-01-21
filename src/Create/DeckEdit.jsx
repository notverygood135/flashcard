import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styles from './Create.module.css';
import Card from './Card';

export default function DeckEdit() {
    const deckID = useParams().id;
    const [deckData, setDeckData] = useState({});
    const [cards, setCards] = useState([]);
    const [cardsData, setCardsData] = useState({});

    const cardList = cards.map(card => 
        <Card 
            key={card.id} 
            id={card.id}
            deckID={card.deckid}
            question={cardsData[card.id]?.question}
            answer={cardsData[card.id]?.answer}
            examples={cardsData[card.id]?.examples}
            deleteCardElement={deleteCardElement}
            deleteCard={deleteCard}
            handleCardDataChange={handleCardDataChange}
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
            setCards(data);
            data.forEach(card => 
                cardsData[card.id] = {question: card.question, answer: card.answer, examples: card.examples});
            setCardsData(cardsData);
        });
    }

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

    function updateDeck(deckID) {
        let id = deckID;
        let dateModify = new Date().toISOString().split('T')[0];
        let name = deckData.name;
        let description = deckData.description;
        fetch('http://localhost:3001/decks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, description, dateModify })
        })
        .then(response => {
            return response.text();
        });
    }

    function addCard() {
        let id = nanoid();
        setCards(prevCards => [...prevCards, {key: id, id: id}]);
        setCardsData(prevCardsData => ({
            ...prevCardsData,
            [id]: {question: '', answer: '', examples: ''}
        }));
    }

    function upsertCard(deckID) {
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
        })
    }

    function deleteCard(id) {
        fetch(`http://localhost:3001/cards/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            setCardsData(prevData => {
                delete prevData.id;
                return prevData;
            });
            setCards(prevCards => prevCards.filter(card => card.id != id));
        })
    }

    function deleteCardElement(event, id) {
        event.stopPropagation();
        setCards(prevCards => prevCards.filter(card => card.id !== id));
        setCardsData(prevCardsData => {
            delete(prevCardsData[id]);
            return prevCardsData;
        });
    }

    function update() {
        updateDeck(deckID);
        upsertCard(deckID);
    }

    return (
        <>
        <section className={styles.deckCreate}>
            <form>
                <input 
                    type='text'
                    placeholder='Deck name'
                    name='name'
                    value={deckData.name}
                    onChange={handleDeckDataChange}
                />
                </form>
            <form>
                <input
                    type="text"
                    placeholder="Description"
                    name='description'
                    value={deckData.description}
                    onChange={handleDeckDataChange}
                />
            </form>
            {cardList.length > 0 ? cardList : <h3>There aren't any cards in this deck yet...</h3>}
            <button className={styles.addCardButton} onClick={addCard}>Add card</button>
            <button type="submit"  onClick={update}>Submit</button>
        </section>
        </>
    )
}