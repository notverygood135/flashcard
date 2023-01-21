const { request } = require('express')
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'flashcard',
    password: 'root',
    port: 5432
})

const getDecks = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM decks', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })            
    })
}

const createDeck = (body) => {
    return new Promise(function(resolve, reject) {
        const { id, name, description, dateCreate, dateModify } = body;
        pool.query('INSERT INTO decks (id, name, description, datecreate, datemodify) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [id, name, description, dateCreate, dateModify], 
            (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new deck has been added: ${results.rows[0]}`);
        })
    })
}

const deleteDeck = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM decks WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Deck deleted with ID: ${id}`);
        })
    }) 
}

const updateDeck = (body) => {
    return new Promise(function(resolve, reject) {
        const { id, name, description, dateModify } = body;
        pool.query('UPDATE decks SET name = $1, description = $2, datemodify = $3 WHERE id = $4', 
        [name, description, dateModify, id],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Deck updated with ID: ${id}`);
        })
    })
}

module.exports = {
    getDecks,
    createDeck,
    deleteDeck,
    updateDeck
}