const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { getNotes, updateFile, deleteNote } = require('./utils');

const  PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Develop/public'));

//HTML ROUTES
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
   
});

//-------------


// API routes

app.get('/api/notes', async (req, res) => {
    const notes = await getNotes();
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  
    const { title, text } = req.body;
    if(!title || !text) {
        return res('Must add note title and note text');
    }

    const newNote = {title, text, id: uuidv4()};
    const notes = await getNotes();
    notes.push(newNote);
    await updateFile(notes);
    res.send(`Added new note ${title}`);
});


app.delete('/api/notes/:id', async (req, res) =>{
    console.log(req.params);
    const noteId = req.params.id;

//read db.json

var status = await deleteNote( noteId);
res.json(status);
//filter the array of notes, itll return a new array
//with the new array we will write it to db.json
//res with {ok: true} 


})




app.listen(PORT, () => {
    console.log (`App listening on port: ${PORT}`);
});