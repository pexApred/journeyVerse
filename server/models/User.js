const { Schema, model } = require('mongoose');// import mongoose
const bcrypt = require('bcrypt');
// create a new mongoose schema
// const journeySchema = require('./Journey');// import journeySchema
const userSchema = new Schema({
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
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,// profile picture is a string
  },
  savedJourneys: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Journey',
    }
  ],
},
{
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('journeyCount').get(function () {
  return this.savedJourneys.length;
});

const User = model('User', userSchema);

module.exports = User;
