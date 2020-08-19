var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

mongoose.connect(
  "mongodb+srv://root:Password123@mongoosetestnermin.t5g7o.mongodb.net/mongotestnermin?retryWrites=true&w=majority",
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected do the database");
    }
  }
);

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

UserSchema.methods.addLastName = function (lastName) {
  this.name = this.name + " " + lastName;
  return this.name;
};

var User = mongoose.model("User", UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:user", function (req, res, next) {
  User.findById({ _id: req.params.user }, function (err, foundUser) {
    foundUser.addLastName("Shiba");
    foundUser.save((err) => {
        res.json(foundUser);
    });
  });
});

app.post("/create-user", function (req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.age = req.body.age;
  user.save((err) => {
    if (err) console.log(err);
    res.json(user);
  });
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Running on port 3000");
  }
});
