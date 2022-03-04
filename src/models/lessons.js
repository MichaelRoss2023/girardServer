const mongoose = require("./db/connector");
const Horse = require("./horses");
const User = require("./users");

const lessonSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  bookedDates: [{
    type: Date,
    required: true,
    default: new Date()
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  volunteers: {
    "barn crew" : {
      required: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "lesson assistent" : {
      required: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "sidewalker" : {
      required: Number,
      signedUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      }]
    },
    "horse leader" : {
      required: Number,
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
  notes: String
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
