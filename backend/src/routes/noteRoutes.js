const express = require("express");
const router = express.Router();
const { authorize } = require('../auth/auth')
const {
    login,
    register,
    createNoteController,
    deleteNoteController,
    updateNoteController,
    getAllUserNotesControllers,

} = require('../controllers/noteController')

router.get('/posts', authorize, (req, res) => {
    // res.json(posts.posts.filter(post => post.id === req.user.name));
    res.send('ok');
})
router.post('/test', (req, res) => {
    res.json(req.body)
});

router.post('/create', authorize, createNoteController)
router.put('/update', authorize, updateNoteController)
router.delete('/delete', authorize, deleteNoteController)
router.get('/getall', authorize, getAllUserNotesControllers)
router.post('/login', login)
router.post('/register', register)



module.exports = router