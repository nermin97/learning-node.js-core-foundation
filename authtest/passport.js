var passport = require("passport");
var LocalStrategy = require("passport-local");
const user = require("./models/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  user.findById(id, (err, user) => {
    done(err, user);
  });
});

// Sign in
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      user.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.comparePassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
