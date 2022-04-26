const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');

// All requests to /articles/{...} will be served through the articleRouter middleware (route)
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        date: Date.now(),
        description: 'Test description'
    }];

    res.render('index', {articles: articles});
});

app.listen(5000);

console.log('Listening on port 5000...');