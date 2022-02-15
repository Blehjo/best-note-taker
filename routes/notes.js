const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid'); 

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note/ to-do
notes.post('/api/notes', (req, res) => {
  console.log(req.body);
  
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

notes.delete('/api/notes/:id', (req, res) => {
  var id = req.params.id
  let obj = db.filter(o => o.note_id != id);
  res.json(obj);
  console.log(obj)

  writeToFile('../db/db.json', obj)
  res.json(`Note added successfully 🚀`);
})
 

module.exports = notes;