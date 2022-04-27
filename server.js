const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost/blog');

app.set('view engine', 'ejs');

// middleware function for parsing of post request into JSON for html forms (where the POST request uses query strings) 
// for content type "application/x-www-form-urlencoded": https://www.youtube.com/watch?v=PbfjNTsHfaU 
app.use(express.urlencoded({ extended: true }));

// middleware for post requests where the request body is JSON format (not used in this app, but included anyway)
// both these middleware functions add content into the `req.body` argument in the post request callback function
app.use(express.json())

// All requests to /articles/{...} will be served through the articleRouter route
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ date: 'descending' });

    res.render('index', {articles: articles});
});

// Start server on default port or on port 5000
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on port ${port}...`);