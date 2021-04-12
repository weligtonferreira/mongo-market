const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const {
    MONGO_HOST,
    MONGO_NAME
} = process.env;

const url = 'mongodb://' + MONGO_HOST + '/' + MONGO_NAME;

mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Mongo    - on');
}, (error) => {
    console.log(error);
})

requireDir('./models');

const index = require('./routes/index');

app.use(express.json());
app.use(cors());
app.use('/api', index);

module.exports = app;
