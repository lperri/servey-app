const mongoose = require('mongoose');
const { Schema } = mongoose;

// we can freely add or subtract properties
const userSchema = new Schema({
    googleID: String,
});

// mongoose.model tells mongoose we want to create a
// new collection called users -- if it already exists, it
// won't overwrite existing collection
mongoose.model('users', userSchema);
