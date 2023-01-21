const { request } = require('express')
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'flashcard',
    password: 'root',
    port: 5432
})

const getDeckCards = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM cards WHERE deckid = $1',[id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })            
    })
}

const createCards = (body) => {
    return new Promise(function(resolve, reject) {
        let data = '';
        for (let key in body) {
            data = data.concat(`('${key}', '${body[key].deckid}', '${body[key].question}', '${body[key].answer}', '${body[key].examples}'), `);   
        }
        data = data.slice(0, -2);
        let query = `INSERT INTO cards (id, deckid, question, answer, examples) VALUES ${data} 
                    ON CONFLICT (id)
                    DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, examples = EXCLUDED.examples
                    RETURNING *`;
        pool.query(query,
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('New cards have been added');
        })
    })
}

const deleteCard = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM cards WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Card deleted with ID: ${id}`);
        })
    }) 
}

module.exports = {
    getDeckCards,
    createCards,
    deleteCard
}