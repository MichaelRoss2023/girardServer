const mongoose = require("./db/connector");

const horseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lessonsPerDay: {
    type: Number,
  },
  beginner: {
    type: Number,
  },
  intermediate: {
    type: Number,
  },
  advanced: {
    type: Number,
  },
  coolDownTime: {
    type: Number
  }
});

const Horse = mongoose.model("Horse", horseSchema);
module.exports = Horse;