const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/notes", () => {
    console.log("The database is running");
});

let db = mongoose.connection;
let notes = require('./note');

db.on('error', (err) => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(cors());

let port = process.env.port || 3000;

app.get('/', (req, res) => {
    notes.find({}, (err, note) => {
        if(err){
            console.log("There was an error");
        }else{
            res.json(note);
        }
    });
});

// Add Note Route

app.post('/addnote', (req, res) => {
    let note = new notes();

    note.title = req.body.title;
    note.content = req.body.content;
    note.date = new Date();

    note.save((err) => {
        if(err){
            console.log('Someting went wrong');
        }
        else{
            console.log("Everything went ok");
        }
    });
});

app.get('/getNotes', (req, res) => {
    notes.find({}, (err, note) => {
        if(err){
            console.log("There was an error");
        }else{
            res.send(note);
        }
    });
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});