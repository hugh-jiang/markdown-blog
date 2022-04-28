// Serve requests to /articles endpoint

const express = require('express');
const Article = require('../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new-article.ejs', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    res.render('edit-article.ejs', { article: await Article.findById(req.params.id) });
});

router.get('/:slug', async (req, res) => {
    // query the article from the db
    const article = await Article.findOne({ slug: req.params.slug });

    res.render('article.ejs', { article: article });
});

router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (e) {
        res.status(400).send(`Unexpected Error: ${e}`);
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);

    // Create new Article model object
    let article = new Article({
        title: req.body.title,
        author: "Hugh Jiang",
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        // Save our article into the database and save the response in `article`
        // Note: save() is an async function, so we need to make our callback function async and await the save() function to terminate
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (e) {
        console.log(e);
        res.send(`Unexpected Error: ${e}`);
    }
});

module.exports = router;