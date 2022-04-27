// Serve requests to /articles

const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new-article');
});

router.post('/', (req, res) => {

});

module.exports = router;