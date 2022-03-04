const { ObjectId } = require("mongodb");
const mongoose = require("./db/connector");
const Skill = require("./skills");
const UserType = require("./userTypes");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastNAme: {
    type: String,
    required: false
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserType,
    required: true,
    default: mongoose.Types.ObjectId('5fba413ce7179a09214d6bc0')
  },
  emailId: {
    type:String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
  },
  Age: {
    type: Number
  },
  skills: [{
    type: mongoose.Types.ObjectId,
    ref: Skill
  }]
});

// userSchema.method("toClient", function() {
//   var obj = this.toObject();
//   //Rename fields
//   obj.id = obj._id;
//   delete obj._id;
//   delete obj.__v;
//   delete obj.password;
//   return obj;
// });

const User = mongoose.model("User", userSchema);
module.exports = User;