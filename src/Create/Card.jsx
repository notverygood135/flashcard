import { useState, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import styles from './Create.module.css';

export default function Card(props) {
    return (
        <>
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <h3>Question</h3>
                <form>
                    <input 
                        type='text' 
                        placeholder='e.g vert'
                        value={props.question}
                        name='question'
                        onChange={event => props.handleCardDataChange(event, props.id)} 
                    />
                </form>
            </div>
            <div className={styles.wrapper}>
                <h3>Answer</h3>
                <form>
                    <input 
                        type='text' 
                        placeholder='e.g green'
                        value={props.answer}
                        name='answer'
                        onChange={event => props.handleCardDataChange(event, props.id)}
                    />
                </form>
            </div>
            <div className={styles.wrapper}>
                <h3>Examples</h3>
                <form>
                    <input 
                        type='text' 
                        placeholder='e.g vert'
                        value={props.examples}
                        name='examples'
                        onChange={event => props.handleCardDataChange(event, props.id)}
                    />
                </form>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.deckButton} id={styles.delete} 
                onClick={(event) => {
                    props.deckID ? props.deleteCard(props.id) : props.deleteCardElement(event, props.id)
                }}>
                    <BiTrash />
                </button>
            </div>
        </div>
        </>
    )
}