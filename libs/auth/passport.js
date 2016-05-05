var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var libs = process.cwd() + '/libs/';
var config = require(libs + '/config');

var User = require(libs + '/model/user'); // get the mongoose model

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.get("mongoose:secret");
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.issuer =  config.get("security:issuer");
  opts.audience = config.get("security:audience");
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
