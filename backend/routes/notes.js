const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get all the Notes Using: GET "/api/notes/fetchallnotes". Login Require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }

})

//ROUTE 2: Add a new Note Using: POST "/api/notes/addnote". Login Require
router.post('/addnote', fetchuser, [
    body('title', "Enter a Valid TITLE!!").isLength({ min: 3 }),
    body('description', "Description must be at least 5 Characters").isLength({ min: 5 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //If there are errors Return Bad Request!!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }
})


//ROUTE 3: Update the Note Using: PUT "/api/notes/updatenote". Login Require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a new note!
    let newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated
    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json(note)

})

module.exports = router