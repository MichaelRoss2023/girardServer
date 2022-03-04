const mongoose = require("./db/connector");
const Skill = require("./skills");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skills: [{
    type: mongoose.Types.ObjectId,
    ref: Skill
  }],
});

const Position = mongoose.model("Position", positionSchema);
module.exports = Position;