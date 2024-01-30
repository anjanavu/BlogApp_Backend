// model/post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageurl: {
        type: String // Change to a single String for the image URL
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'signupdata', 
        required: true 
    }
}, {
    timestamps: true
});

const postdata = mongoose.model('postdata', postSchema);

module.exports = postdata;
