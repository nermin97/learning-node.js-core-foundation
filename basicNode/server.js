var express = require("express");

var app = express();

function enteringMexicoBorder(req, res, next) {
  if (req.params.name === "ok") {
    next();
  } else {
    res.json("No!");
  }
}

app.get("/mexico/:name", enteringMexicoBorder, function (req, res, next) {
  res.json("We have arrived! thank god");
});

app.listen(9000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Running on port 9000");
  }
});
