// Require modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid')
const db = require('./db/db.json')
const notes = require('./db/db.json')
const { readAndAppend, readFromFile } = require('./helpers/fsUtils')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);