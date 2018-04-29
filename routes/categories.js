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
router.post('/add', [
  check('title').matches(/^[a-zA-Z]/).withMessage('The title cannot be empty and has to start with a letter'),
  check('description').not().isEmpty().withMessage('The description cannot be empty')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('add_category', {
      title: 'Create Category',
      category_title: req.body.title,
      category_description: req.body.description,
      error_message: errors.mapped()
    });
    //res.redirect('/manage/categories');
  } else {
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;
    Category.addCategory(category, (err, category) => {
      if (err) {
        req.flash('error', 'Category Not Saved');
        res.send(err);
      }
      req.flash('success', 'Category Saved');
      res.redirect('/manage/categories');
    });
  }
});

// Edit category - POST
router.post('/edit/:id', [
  check('title').matches(/^[a-zA-Z]/).withMessage('The title cannot be empty and has to start with a letter'),
  check('description').not().isEmpty().withMessage('The description cannot be empty')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const category = {
      title:  req.body.title,
      description: req.body.description,
      _id: req.params.id
    };
    res.render('edit_category', {
      title: 'Edit Category',
      category: category,
      error_message: errors.mapped()
    });

  // if (!errors.isEmpty()) {
  //   res.render('edit_category', {
  //     category: {
  //       title: req.body.title,
  //       description: req.body.description,
  //       _id: req.params.id
  //     },
  //     error_message: errors.mapped()
  //   });
  } else {
    let category = new Category();
    const query = {_id: req.params.id};
    const update = { title: req.body.title, description: req.body.description};
    Category.updateCategory(query, update, {}, (err, category) => {
      if (err) {
        res.send(err);
      }
      req.flash('success', 'Category Updated');
      res.redirect('/manage/categories');
    });
  }
});

// Delete category - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err);
    }
    req.flash('success', 'Category Deleted');
    res.sendStatus(200);
  });
});

module.exports = router;
