const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// done is a callback after we do some work
// the first argument of done is an error object
// user.id is the idenitfying piece of info that will identify the user in followup requests
passport.serializeUser((user, done) => {
    // user.id is NOT profile.id
    // user.id is the _id property in our mongo record
    // why do we use this id assigned by mongo instead?
    // because what if we want to sign in with FB, twitter, etc?
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // search thru our users in mongoDB
    // once we find the right user, return that in done callback
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// take passport library and tell it to make use of the google oauth strategy
// new GoogleStrategy() creates a new instance of the google passport strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            // query the mongo DB to see if this user exists already
            User.findOne({ googleID: profile.id }).then((existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record
                    new User({ googleID: profile.id })
                        .save()
                        // we don't want to call done here until we know for a fact user
                        // has been successfully saved to DB
                        .then((user) => done(null, user));
                    // the user model instance inside the promise callback is the one we want
                    // to use because it is the freshest record, we just received back from mongo DB
                }
            });
        }
    )
);
