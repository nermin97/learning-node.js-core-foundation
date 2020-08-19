var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var ejs = require("ejs");
var engine = require("ejs-mate");

var MongoStore = require("connect-mongo")(session);
var passport = require("passport");

var passportConf = require("./passport");
var User = require("./models/user");

const PORT = 8080;

var app = express();

mongoose.connect(
  "mongodb+srv://root:Password123@mongoosetestnermin.t5g7o.mongodb.net/mongotestnermin?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected do the database");
    }
  }
);

app.use(express.static(__dirname + "/public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "5f3d730af43d1447f83086ce",
    store: new MongoStore({
      url:
        "mongodb+srv://root:Password123@mongoosetestnermin.t5g7o.mongodb.net/mongotestnermin?retryWrites=true&w=majority",
      autoReconnect: true,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/login", (req, res, next) => {
  if (req.user) return res.redirect("/");
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

app.get("/profile", (req, res, next) => {
  res.render("profile");
});

app.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

app.post("/create-user", (req, res, next) => {
  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err) => {
    err ? console.log(err) : res.render("profile");
  });
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Running on port " + PORT);
});
