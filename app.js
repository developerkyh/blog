'use strict';

const path = require('path');
const express = require('express');
//const passport = require('passport');
const config = require('./config');


const app = express();
app.use(require('connect-history-api-fallback')());
app.use(express.static(path.resolve(path.join(__dirname, '/dist'))));


// Setup view engine
app.set('view engine', 'vue');
app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
