import { useState, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import styles from './Test.module.css';

export default function TestCard(props) {
    const [showAnswer, setShowAnswer] = useState(false);

    function handleClick () {
        setShowAnswer(!showAnswer);
    }

    return (
        <>
        <div id={styles.testCard} className={showAnswer ? 'active' : null} onClick={handleClick}>
            <div id={styles.cardQuestion}>
                <h1>{props.question}</h1>
                {showAnswer && <h2>{props.answer}</h2>}
            </div>
            {showAnswer &&
            <div id={styles.cardExamples}>
                <h2>Example:</h2>
                <p>{props.examples}</p>
            </div>}
        </div>
        </>
    )
}