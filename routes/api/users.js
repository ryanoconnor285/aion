const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//TODO : Make profile API to handle timeStampAction

// Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already in use.';
        return res.status(400).json({ errors });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          timeStampAction: req.body.timeStampAction,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });
      }
    })
});

// @route   POST api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for User
      if (!user) {
        errors.email = 'Email not found';
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched

            const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName } // Create JWT Payload

            // Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 10800 }, (err, token) => {
              res.json({ success: true, token: 'Bearer ' + token })
            });
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        })
    })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    timeStampAction: req.body.timeStampAction,
    email: req.user.email,
  });
});

module.exports = router;