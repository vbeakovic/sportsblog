const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

Category = require('../models/category.js');
Article = require('../models/article.js');

// Get articles - GET
router.get('/', (req, res, next) => {
  Article.getArticles( (err, articles) => {
    if (err) {
      console.log(err);
    }
    res.render('articles', {
      title: 'Articles',
      articles: articles
    });
  });

});

// Show single article - GET
router.get('/show/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    if (err) {
      console.log(err);
    }

    res.render('article', {
      title: 'Article',
      article: article,
      error_message: []
    });
  });
});

// Show articles of specific category - GET
router.get('/category/:category_id', (req, res, next) => {
  Article.getCategoryArticles(req.params.category_id, (err, articles) => {
    if (err) {
      console.log(err);
    }
    Category.getCategoryById(req.params.category_id, (err, category) => {
      if (err) {
        console.log(err);
      }
      res.render('articles', {
        title: category.title + ' Articles',
        articles: articles
      });
    })
  });
});

// Add article - POST
router.post('/add', [
  check('title').not().isEmpty().withMessage('The title cannot be empty'),
  check('subtitle').not().isEmpty().withMessage('The subtitle cannot be empty'),
  check('author').not().isEmpty().withMessage('The author cannot be empty'),
  check('body').not().isEmpty().withMessage('The body cannot be empty')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Category.getCategories((err, categories) => {
      if (err) {
        console.log(err);
      }
      res.render('add_article', {
        title: 'Create Article',
        article_title: req.body.title,
        article_subtitle: req.body.subtitle,
        article_author: req.body.author,
        article_category: req.body.category,
        article_body: req.body.body,
        categories: categories,
        error_message: errors.mapped()
      });
    });
  } else {
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
      req.flash('success', 'Article Created');
      res.redirect('/manage/articles');
    });
  }
});

// Update article - POST
router.post('/edit/:id', [
  check('title').not().isEmpty().withMessage('The title cannot be empty'),
  check('subtitle').not().isEmpty().withMessage('The subtitle cannot be empty'),
  check('author').not().isEmpty().withMessage('The author cannot be empty'),
  check('body').not().isEmpty().withMessage('The body cannot be empty')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Category.getCategories((err, categories) => {
      if (err) {
        console.log(err);
      }
      res.render('edit_article', {
        title: 'Edit Article',
        article_id: req.params.id,
        article_title: req.body.title,
        article_subtitle: req.body.subtitle,
        article_author: req.body.author,
        article_category: req.body.category,
        article_body: req.body.body,
        categories: categories,
        error_message: errors.mapped()
      });
    });
  } else {
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
      req.flash('success', 'Article Updated');
      res.redirect('/manage/articles');
    });
  }
});

// Add comment - POST
router.post('/comments/add/:id', [
  check('subject').not().isEmpty().withMessage('The subject cannot be empty'),
  check('name').not().isEmpty().withMessage('The name cannot be empty'),
  check('email').not().isEmpty().withMessage('The email cannot be empty'),
  check('body').not().isEmpty().withMessage('The body cannot be empty')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Article.getArticleById(req.params.id, (err, article) => {
      const comment = {
        subject: req.body.subject,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body
      };
      res.render('article', {
        title: 'Article',
        article: article,
        comment: comment,
        error_message: errors.mapped()
      });
    });
  } else {
    let article = new Article();
    let query = { _id: req.params.id};
    let comment = {
      comment_subject: req.body.subject,
      comment_author: req.body.name,
      comment_email: req.body.email,
      comment_body: req.body.body
    };
    console.log(comment);
    Article.addComment(query, comment, (err, article) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/articles/show/' + req.params.id);
    });
  }
});


// Delete article - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Article.removeArticle(query, (err, article) => {
    if (err) {
      res.send(err);
    }
    req.flash('success', 'Article Deleted');
    res.sendStatus(200);
  });
});


module.exports = router;
