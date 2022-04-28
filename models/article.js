// Module to create and export the mongoose model for an Article
const mongoose = require('mongoose');
const slugify = require('slugify');

// Modules for sanitizing markdown and processing it
const marked = require('marked'); // processing markdown -> html
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurifier = createDomPurify(new JSDOM().window);


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

    slug: {
        type: String,
        required: true,
        unique: true
    },

    description: {
       type: String
    },

    markdown: {
        type: String,
        required: true
    },

    sanitizedHtml: {
        type: String,
        required: true
    }
});


// Function that sets the slug before mongoose runs validation for the schema
// We need to explicitly declare the function instead of using => (not sure why)
schema.pre('validate', function(next) {
    // console.log('here');

    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    if (this.markdown) {
        const html = marked.parse(this.markdown); // convert markdown to html
        this.sanitizedHtml = dompurifier.sanitize(html); // sanitize html and add to db
    }
    
    next();
});


// Export the mongoose model
module.exports = mongoose.model('Article', schema);