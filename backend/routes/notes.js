const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get all the Notes Using: GET "/api/auth/fetchallnotes". Login Require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
 } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
        
    }

})

//ROUTE 2: Add a new Note Using: POST "/api/auth/addnote". Login Require
router.get('/addnote', fetchuser, [
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
    const savedNotes= await note.save()
    res.json(savedNotes)
         
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
        
}
})

module.exports = router