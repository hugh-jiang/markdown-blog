// Module to create and export the mongoose model for an Article
const mongoose = require('mongoose');


// Define schema for an article object in the database
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 

    author: {
        type: String,
        default: "Hugh Jiang"
    },

    date: {
        type: Date,
        default: () => Date.now() // return the default date as the current date
    },

    description: {
       type: String
    },

    markdown: {
        type: String,
        required: true
    }
});


// Export the mongoose model
module.exports = mongoose.model('Article', schema);