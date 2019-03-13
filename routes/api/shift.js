const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Shift model
const Shift = require('../../models/Shift');

// Load User Model
const User = require('../../models/User');

// @route   GET api/shift/test
// @desc    Tests shift route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Shift Works' }));

// @route   GET api/shift/all
// @desc    Get current user's shifts
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Shift.find({ user: req.user.id })
    .then(shifts => {
      if (!shifts) {
        errors.shifts = 'There are no shifts for this user';
        return res.status(400).json(errors);
      }
      res.json(shifts);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/shift/clockIn
// @desc    Create a new shift and clock in with a description
// @access  Private
router.post('/clockIn', passport.authenticate('jwt', { session: false }), (req, res) => {
  const clockInFields = {};
  clockInFields.user = req.user.id;
  if (req.body.clockInDesc) clockInFields.clockInDesc = req.body.clockInDesc;

  new Shift(clockInFields).save()
    .then(shift => res.json(shift))
    .catch(err => res.status(404).json(err));
});


module.exports = router;