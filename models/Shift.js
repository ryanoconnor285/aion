const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shift Schema

const ShiftSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  clockInDesc: {
    type: String
  },
  clockIn: {
    type: Date,
    default: Date.now
  },
  clockOutDesc: {
    type: String
  },
  clockOut: {
    type: Date
  }
});


module.exports = Shift = mongoose.model('shift', ShiftSchema);