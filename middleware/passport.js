const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const User = require("../db/models/User");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      // check the validation of the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch)
        // if the password encrypted and the one in backend the same
        return done(null, user);
      // دايما null قيمه نحطها عشان الدون ماتاخذ ايرور
      else {
        return done(null, false);
      }
    } else {
      // if password incorrect 401 not authorized
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp)
      //if the token is expired
      return done(null, false);
    try {
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
