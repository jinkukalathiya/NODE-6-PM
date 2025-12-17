const passport = require('passport');

const users = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(
        { usernameField : "email" },
        (email, password, done) => {
            const user = users.find(u => u.email === email);
            if(!user){
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err){
                    return done(err);
                }

                if(!isMatch){
                    return done(null, false);
                }
                return done(null, user);
            })
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

module.exports = passport;