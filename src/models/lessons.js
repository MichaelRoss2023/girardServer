const mongoose = require('mongoose');
const Horse = require('./horses');
const User = require('./users');

const lessonSchema = new mongoose.Schema({
  // store dates in UTC timezone  
  startTime: {
      type: Date,
      required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  volunteers: {
    "barn crew" : {
      minVolunteers: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "pasture crew" : {
      minVolunteers: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "lesson assistant" : {
      minVolunteers: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "sidewalker" : {
      minVolunteers: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "horse leader" : {
      minVolunteers: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
  },
  horses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Horse,
  }],
  notes: {
    type: String
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;