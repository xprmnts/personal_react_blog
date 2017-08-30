// this module will implement the strategies to authenicate a suer
const passport = require("passport");
const User = require("../database/models/user");
const config = require("../keys/config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Local Strategy Setup
const localLogin = new LocalStrategy(function(username, password, done) {
  // Verify this username and password,
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare passwords
    // if it is the correct username and password call done
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done({ err });
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
    // otherwise, call done w/ flase
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.jwtSecret
};

// Create JWT Strategy
// payload = decoded token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID decoded from payload exists in our db
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      // if exists call done with user -> passport handles user object
      done(null, user);
    } else {
      // if not exists call done wihout user object -> passport handles
      done(null, false);
    }
  });
});

// Use JWT Strategy
passport.use(jwtLogin);

passport.use(localLogin);
