var mongoose = require("mongoose");
const passport = require("passport");
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

UserSchema.methods.comparePassword = (password) => {
  return this.password === password;
};

module.exports = mongoose.model("User", UserSchema);
