
const mongoose = require('mongoose');// import mongoose
// create a new mongoose schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,// first name is a string; it is required
    required: true,
  },
  lastName: {
    type: String,// last name is a string; it is required
    required: true,
  },
  email: {
    type: String,// email is a string; it is required and unique
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,// profile picture is a string
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
