const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//TODO : Make profile API to handle timeStampAction

// Create User Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  timeStampAction: {
    type: String,
    required: false,
    default: null
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);