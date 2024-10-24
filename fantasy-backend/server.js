const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fantasyGame', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/players', playersRoute);
app.use('/teams', teamsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
