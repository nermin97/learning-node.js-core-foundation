var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var engine = require("ejs-mate");
var PORT = 8080;

var app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:name", (req, res, next) => {
  res.render("home", { name: req.params.name });
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Running on port " + PORT);
});
