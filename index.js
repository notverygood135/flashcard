const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const corsOptions = {
    origin: true,
    credentials: true,
};
app.options('*', cors(corsOptions));

const deckModel = require('./deckModel');
const cardModel = require('./cardModel');

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Max-Age', 86400);
    next();
})

app.get('/decks', (req, res) => {
    deckModel.getDecks()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/decks', (req, res) => {
    deckModel.createDeck(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/decks/:id', (req, res) => {
    deckModel.deleteDeck(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.put('/decks', (req, res) => {
    deckModel.updateDeck(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/cards/:id', (req, res) => {
    cardModel.getDeckCards(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/cards', (req, res) => {
    cardModel.createCards(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/cards/:id', (req, res) => {
    cardModel.deleteCard(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
