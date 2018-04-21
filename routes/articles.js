const express = require('express');
const router = express.Router();

Article = require('../models/article.js');

router.get('/', (req, res, next) => {
  res.render('articles', {
    title: 'Articles'
  });
});

router.get('/show/:id', (req, res, next) => {
  res.render('article', {
    title: 'Article'
  });
});

router.get('/category/:category_id', (req, res, next) => {
  res.render('articles', {
    title: 'Category Articles'
  });
});

// Add article - POST
router.post('/add', (req, res, next) => {
  let article = new Article();
  article.title = req.body.title;
  article.subtitle = req.body.subtitle;
  article.category = req.body.category;
  article.body = req.body.body;
  article.author = req.body.author;
  Article.addArticle(article, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/articles');
  });
});

// Update article - POST
router.post('/edit/:id', (req, res, next) => {
  let article = new Article();
  const query = {_id: req.params.id};
  const update = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    body: req.body.body,
    author: req.body.author
  }

  Article.updateArticle(query, update, {}, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/articles');
  });
});

// Delete article - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Article.removeArticle(query, (err, article) => {
    if (err) {
      res.send(err);
          console.log('Test2');
    }
    res.sendStatus(200);
    console.log('Test');
  });
});

module.exports = router;
