const mongoose = require("./db/connector");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Decimal128
  }
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;