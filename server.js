const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');

// All requests to /articles/{...} will be served through the articleRouter middleware (route)
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        author: 'Hugh Jiang',
        date: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article',
        author: 'Hugh Jiang',
        date: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article',
        author: 'Hugh Jiang',
        date: new Date(),
        description: 'Test description'
    }];

    res.render('index', {articles: articles});
});

// Start server on default port or on port 5000
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on port ${port}...`);