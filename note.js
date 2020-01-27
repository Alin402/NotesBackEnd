const mongoose = require('mongoose');

let noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
});
let Note = mongoose.model('Note',  noteSchema);

module.exports = exports = Note;
