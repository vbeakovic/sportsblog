const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

Category = require('../models/category.js');

// Get categories - GET
router.get('/', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      console.log(err);
    }
    res.render('categories', {
      title: 'Categories',
      categories: categories
    });
  });
});


// Add category - POST
router.post('/add', (req, res, next) => {
  let category = new Category();
  category.title = req.body.title;
  category.description = req.body.description;
  Category.addCategory(category, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/categories');
  });
});

// Edit category - POST
router.post('/edit/:id', (req, res, next) => {
  let category = new Category();
  const query = {_id: req.params.id};

  const update = { title: req.body.title, description: req.body.description};
  Category.updateCategory(query, update, {}, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/categories');
  });
});

// Delete category - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err);
          console.log('Test2');
    }
    res.sendStatus(200);
    console.log('Test');
  });
});

module.exports = router;
