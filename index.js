const express = require('express');
require('./server/services/passport');

const app = express();

require('./server/routes/authRoutes')(app);

// Heroku sets the PORT environment variable if running in prod
const PORT = process.env.PORT || 5000;
app.listen(PORT);
//in browser, go to localhost:5000 shows {"hi": "there"}
