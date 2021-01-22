const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// any file you want to import that ends in .js, don't need to include .js in relative path:
const keys = require('./server/config/keys');

// create a new express application
const app = express();
// this app object will be used to set up configuration that will listen for
// incoming requests that are being routed to the express side of the app from
// the node side and then route these requests to the route handlers

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

// handle routes
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// this request will be sent with the code we received from google for that particular user
app.get('/auth/google/callback', passport.authenticate('google'));

// Heroku sets the PORT environment variable, tells us which port to use
// in the case that we are not running in prod, but in dev, use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
//in browser, go to localhost:5000 shows {"hi": "there"}
