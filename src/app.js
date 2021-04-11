const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://172.19.0.2/mongo-market', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch((err) => console.log(err));

requireDir('./models');

const index = require('./routes/index');

app.use(express.json());
app.use(cors());
app.use('/api', index);

module.exports = app;
