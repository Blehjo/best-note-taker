// Require modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid')
let db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get route for home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Get route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET db.json to append notes from database
app.get('/api/notes', (req, res) => res.json(db));

app.get('api/notes/:id', (req, res) => {
    const {title, text} = req.body;

    let obj = db.find(o => o.note_id === id);
    res.json(obj);

})

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body
    
    const newNote = {
        title,
        text,
        id: uuid()
    }

    db.push(newNote)
    res.json(db)
    fs.writeFile('db/db.json', JSON.stringify(db, null, 3), (err) => {
        if (err) console.log('ERROR!')
        else {console.log('SUCCESS! WROTE db.json with new array')}
    })
});

app.delete(`/api/notes/:id`, (req, res) => {
    if (db.length <= 1) {
        db = []
        res.json(db)
        fs.writeFile('db/db.json', JSON.stringify(db, null, 3), (err) => {
            if (err) console.log('ERROR!')
            else {console.log('SUCCESS! WROTE db.json with new array')}
        })
    } else {
        let newDB = db.filter((item) => item.id !== req.params.id)
        db = newDB
        res.json(db)
        fs.writeFile('db/db.json', JSON.stringify(db, null, 3), (err) => {
            if (err) console.log('ERROR!')
            else {console.log('SUCCESS! WROTE db.json with new array')}
        })
    }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);