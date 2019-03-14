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

// @route   GET api/shift/find/:shiftId
// @desc    Find a shift by shift _id
// @access  Private
router.get('/find/:shiftId', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Shift.findOne({ _id: req.params.shiftId })
    .then(shifts => {
      if (!shifts) {
        errors.noShift = 'There was no shift found';
        return res.status(400).json(errors);
      }
      res.json(shifts);
    })
    .catch(err => res.status(404).json(err));
});

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
  const shiftFields = {};
  shiftFields.user = req.user.id;
  if (req.body.clockInDesc) shiftFields.clockInDesc = req.body.clockInDesc;

  new Shift(shiftFields).save()
    .then(shift => res.json(shift))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/shift/clockOut/:shiftId
// @desc    Clock out of shift with param shiftId
// @access  Private
router.post('/clockOut/:shiftId', passport.authenticate('jwt', { session: false }), (req, res) => {

  const currentTime = Date.now();
  const shiftFields = {};
  if (req.body.clockOutDesc) shiftFields.clockOutDesc = req.body.clockOutDesc;
  shiftFields.clockOut = currentTime;

  Shift.findOneAndUpdate(
    { _id: req.params.shiftId },
    { $set: shiftFields },
    { new: true }
  )
    .then(shift => res.json(shift))
    .catch(err => res.status(404).json(err));

});

// @route   POST api/shift/edit/:shiftId
// @desc    Clock out of shift with param shiftId
// @access  Private
router.post('/edit/:shiftId', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};
  const shiftFields = {};
  if (req.body.clockInDesc) shiftFields.clockInDesc = req.body.clockInDesc;
  if (req.body.clockIn) shiftFields.clockIn = req.body.clockIn;
  if (req.body.clockOutDesc) shiftFields.clockOutDesc = req.body.clockOutDesc;
  if (req.body.clockOut) shiftFields.clockOut = req.body.clockOut;
  Shift.findByIdAndUpdate({ _id: req.params.shiftId })
    .then(shift => {
      if (!shift) {
        errors.noShift = 'There is no shift for this user';
        return res.status(400).json(errors);
      }
      return res.json()
    })
    .catch(err => res.status(404).json(err));

});

// @route   POST api/shift/delete/:shiftId
// @desc    Clock out of shift with param shiftId
// @access  Private
router.post('/delete/:shiftId', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};
  Shift.findOneAndDelete({ _id: req.params.shiftId })
    .then(shift => {
      if (!shift) {
        errors.noShift = 'There is no shift for this user';
        return res.status(400).json(errors);
      }
      return res.json()
    })
    .catch(err => res.status(404).json(err));

});


module.exports = router;