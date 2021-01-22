const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // this request will be sent with the code we received
    // from google for that particular user
    app.get('/auth/google/callback', passport.authenticate('google'));
};
