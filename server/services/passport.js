const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// take passport library and tell it to make use of the google oauth strategy
// new GoogleStrategy() creates a new instance of the google passport strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile:', profile);
        }
    )
);
