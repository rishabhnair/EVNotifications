const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  ChargerLocation: {
    type: Number,
    default: 100000
  },
  slackID: {
    type: String,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
