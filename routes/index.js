const express = require('express');
const router = express.Router();

Article = require('../models/article.js');

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: 'Index',
      articles: articles
    });
  }, 4);
});

module.exports = router;
