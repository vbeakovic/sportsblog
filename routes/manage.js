const express = require('express');
const router = express.Router();

Category = require('../models/category.js');
Article = require('../models/article.js');

router.get('/articles', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if (err) {
      res.send(err);
    }
    res.render('manage_articles', {
      title: 'Manage Articles',
      articles: articles
    });
  });

});

router.get('/categories', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      console.log(err);
    }
    res.render('manage_categories', {
      title: 'Categories',
      categories: categories
    });
  });
});


router.get('/articles/add', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }
    res.render('add_article',
    {
      title: 'Create Article',
      categories: categories,
      error_message: []
    });
  });
});

router.get('/categories/add', (req, res, next) => {
  res.render('add_category', { title: 'Create Category', error_message: []});
});



router.get('/categories/edit/:id', (req, res, next) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.render('edit_category', {
      title: 'Edit Category',
      category: category,
      error_message: ''
    });
  });

});

router.get('/articles/edit/:id', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }
    Article.getArticleById(req.params.id, (err, article) => {
      if (err) {
        res.send(err);
      }
      res.render('edit_article', {
        title: 'Edit Article',
        article: article,
        categories, categories
      });
    })
  })
});


module.exports = router;
