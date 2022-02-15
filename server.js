// Require modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid')
const db = require('./db/db.json')
const { readAndAppend, writeToFile, readFromFile } = require('./helpers/fsUtils')
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);


// Get route for home page
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
)

// Get route for home page
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// GET db.json to append notes from database
app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.get('/api/notes/:id', (req, res) => {
    var id = req.params.id
    let obj = db.find(o => o.note_id === id);
    res.json(obj);
    console.log(obj)
})

app.delete('/api/notes/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.post('/api/notes', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);