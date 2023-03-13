// import passport
const passport = require('passport');
// import passport-jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;
// import extract jwt from request
const ExtractJWT = require('passport-jwt').ExtractJwt;
// import doctor model
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hospital-api'
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done){
    const doctor = await Doctor.findById(jwtPayload._id);
    if(doctor){
        return done(null, doctor);
    }else{
        return done(null, false);
    }
    
}));

module.exports = passport;