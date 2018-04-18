const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// port
const port = 3000;

// init
const app = express();

// Import routes
const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');


// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static files folder
app.use(express.static(path.join(__dirname, 'public')));

// External css and js
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express validation
app.post('/user', [
  check('username')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('must be an email')

    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail()

    // ...or throw your own errors using validators created with .custom()
    .custom(value => {
      return findUserByEmail(value).then(user => {
        throw new Error('this email is already in use');
      })
    }),

  // General error messages can be given as a 2nd argument in the check APIs
  check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/),

  // No special validation required? Just check if data exists:
  check('addresses.*.street').exists(),

  // Wildcards * are accepted!
  check('addresses.*.postalCode').isPostalCode(),

  // Sanitize the number of each address, making it arrive as an integer
  sanitize('addresses.*.number').toInt()
], (req, res, next) => {
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  // matchedData returns only the subset of data validated by the middleware
  const user = matchedData(req);
  createUser(user).then(user => res.json(user));
});

// Routes
app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

// Start listening
app.listen(port, () => {
  console.log('Server started on port ' + port);
})
