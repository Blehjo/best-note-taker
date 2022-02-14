const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid'); 

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note/ to-do
notes.post('/', (req, res) => {
  console.log(req.body);
  
  const { note_title, note_text} = req.body;

  if (req.body) {
    const newNote = {
      note_title,
      note_text,
      note_id: uuid(),
    };

    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

module.exports = notes;