const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    points: Number,
});

module.exports = mongoose.model('Player', playerSchema);
