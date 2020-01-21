const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email          : String,
  local            : {
    username     : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    token        : String
  },
  google           : {
    id           : String,
    token        : String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
