const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./server/config/keys');
const mongoURI = require('./server/config/keys').mongoURI;
// order of these next two lines MATTERS
// otherwise: "MissingSchemaError: Schema hasn't been registered for model 'users'."
require('./server/models/User');
require('./server/services/passport');

mongoose.connect(mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/authRoutes')(app);

// Heroku sets the PORT environment variable if running in prod
const PORT = process.env.PORT || 5000;
app.listen(PORT);
