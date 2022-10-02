const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    enum: ['instructor', 'volunteer', 'volunteer coordinator'],
    required: true
  },
  email: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide a valid email"]
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please provide a valid phone number"]
  },
  // in inches
  height: {
    type: Number,
  },
  age: {
    type: Number
  },
  horseExperience: {
    type: Number,
    required: true,
    default: 0
  },
  horseRiding: {
    type: Boolean
  },
  horseTacking: {
    type: Boolean
  },
  horseGrooming: {
    type: Boolean
  },
  horseLeading: {
    type: Boolean
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;