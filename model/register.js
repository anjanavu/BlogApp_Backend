const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes leading and trailing whitespaces
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Converts email to lowercase
        match: [/^\S+@\S+\.\S+$/, 'Invalid email'] // Basic email format validation
    },
    address: {
        type: String,
        trim: true
    },
    phonenumber: {
        type: Number
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    }
});

const signdata = mongoose.model('signupdata', signSchema);

module.exports = signdata;
