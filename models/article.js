// Module to create and export the mongoose model for an Article
const mongoose = require('mongoose');
const slugify = require('slugify');

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
    },

    slug: {
        type: String,
        required: true,
        unique: true
    }
});


// Function that sets the slug before mongoose runs validation for the schema
// We need to explicitly declare the function instead of using => (not sure why)
schema.pre('validate', function(next) {
    console.log('here');

    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    
    next();
});


// Export the mongoose model
module.exports = mongoose.model('Article', schema);