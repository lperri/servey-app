const express  = require('express');
// inside of a node app, we may have several different express apps, but majority have a single app
// by calling express() like a function, it creates a new express application
const app = express();
// this app object will be used to set up configuration that will listen for
// incoming requests that are being routed to the express side of the app from
// the node side and then route these requests to the route handlers

//  example route handler
app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

// Heroku sets the PORT environment variable, tells us which port to use
// in the case that we are not running in prod, but in dev, use 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);
//in browser, go to localhost:5000 shows {"hi": "there"}