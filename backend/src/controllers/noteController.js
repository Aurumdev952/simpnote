const asyncHandler = require('express-async-handler');
const {
    authenticate
} = require('../auth/auth')
const {
    registerUser,
    authenticateUser,
    createNote,
    updateNote,
    deleteNote,
    getAllUserNotes
} = require('./masterNoteController');


const register = asyncHandler(async (req, res) => {
    const result = await registerUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    if (result?.status === 'unregistered') {
        console.log(result);
        res.status(404).json(result);
    } else {
        const accessKey = authenticate(JSON.stringify(result))
        res.json({
            id: result._id,
            accessKey: accessKey
        });
    }

    

})

const login = asyncHandler(async (req, res) => {
    const user = await authenticateUser({
        email: req.body.email,
        password: req.body.password
    })
    if (user?.status == "error") {
        console.log(user);
        res.status(404).json(user)
    } else {
        const accessKey = authenticate(JSON.stringify(user))
        const id = JSON.parse(user)
        res.json({
            id: id._id,
            accessKey: accessKey
        });
    }

});

const createNoteController = asyncHandler(async (req, res) => {
    const data = req.body
    data.user = req.user._id
    const note = await createNote(req.body, req.user._id)
    res.json(note);
});
const deleteNoteController = asyncHandler(async (req, res) => {
    const note = await deleteNote(req.body._id)
    res.json(note);
});
const updateNoteController = asyncHandler(async (req, res) => {
    const note = await updateNote(req.body);
    res.json(note);
});


const getAllUserNotesControllers = asyncHandler(async (req, res) => {
    const notes = await getAllUserNotes(req.user._id);
    res.json(notes);
});


module.exports = {
    register,
    login,
    createNoteController,
    deleteNoteController,
    getAllUserNotesControllers,
    updateNoteController
}