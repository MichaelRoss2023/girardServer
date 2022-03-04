const mongoose = require("./db/connector");

const userTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  }
});


const UserType = mongoose.model("UserType", userTypeSchema);

// UserType.insertMany([
//   {
//     type: "instructor",
//   },
//   {
//     type: "volunteer coordinator",
//   },
//   {
//     type: "volunteer",
//   }
// ]);

module.exports = UserType;

