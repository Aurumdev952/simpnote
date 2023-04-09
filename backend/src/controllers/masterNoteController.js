const asyncHandler = require('express-async-handler');
const { User, Note } = require('../modals/modal')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const authenticateUser = asyncHandler(async (userData) => {
    try {
        const user = await User.findOne({ email: userData.email }).lean()
        if (user != null) {
            const password = await bcrypt.compare(userData.password, user.password)
            if (password) {
                return await JSON.stringify(user)
            } else {
                throw new Error("password is incorrect")
            }
        } else {
            throw new Error("user not found")
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.message
        }
    }


}) 

const registerUser = asyncHandler(async (userData) => {
    try {
        const password = await bcrypt.hash(userData.password, 10)
        return await User.create({
            username: userData.username,
            email: userData.email,
            password: password
        })
        

    } catch (error) {

        return {
            status: 'unregistered',
            error: error.message
        }
    }
    
});

const addNoteToUser = asyncHandler(async (noteId, userId) => {
    return await User.findOneAndUpdate(
        { _id: userId },
        { $push: { notes: noteId }}
    ).lean()
});


const createNote = asyncHandler(async (noteData, userdata) => {
    const note = await Note.create(noteData)
    const a = await addNoteToUser(note._id, userdata)
    return note
})

const deleteNote = asyncHandler(async (noteId) => {
    return await Note.findByIdAndDelete(noteId).lean()
})

const updateNote = asyncHandler(async (noteData) => {
   return await Note.findByIdAndUpdate(noteData._id, noteData, {
    new: true,
   }).lean()
})



const getAllUserNotes = asyncHandler(async (userId) => {
    return await await Note.aggregate([
        { $match: {
            user: {
                $eq: mongoose.Types.ObjectId(userId)
            }
        } }
      ])
});

// const getAllUserNotes = asyncHandler(async (userId) => {
//     return await User
//    .findOne({_id: userId })
//    .populate({
//       path: "notes"
//    }).lean();
// });


module.exports = {
    registerUser,
    authenticateUser,
    createNote,
    deleteNote,
    updateNote,
    getAllUserNotes
}



