const mongoose = require('mongoose');


// mongoose.set('bufferCommands', false);
const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
}, {timestamps: true});

const noteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    text: String,
    // date_added: { type: Date, default: Date.now },
}, {
    timestamps: true
});
const Note = mongoose.model('Note', noteSchema);
const User = mongoose.model('User', userSchema);


module.exports = { Note, User };