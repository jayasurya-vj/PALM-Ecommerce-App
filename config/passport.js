
import {User} from "./../models/user.js";
import passport from "passport";
import passportLocal from "passport-local";
import validator  from "express-validator";

const LocalStrategy = passportLocal.Strategy; 
const  { validationResult }   = validator;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

 const validateReq = (req) => {
    let errors = validationResult(req);
    let messages = null;
    if (!errors.isEmpty()) {
        messages=errors.array().map(error => error.msg);         
    }
    return messages;
}

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    let messages = validateReq(req);
    if(messages) {return done(null, false, req.flash('error', messages)); }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
           if (err) {
               return done(err);
           }
           return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    let messages = validateReq(req);
    if(messages) {return done(null, false, req.flash('error', messages)); }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));


export default passport;