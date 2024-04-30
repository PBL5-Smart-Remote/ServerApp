const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./config/db');
const app = express();
const port = 5500;

const route = require('./routes');
// Connect to DB

db.connect();
// db.models;

//apply middleware
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// Static file: directory of Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`My app listening on port http://localhost:${port}`);
});

// ngrok http --scheme=http 4000 --host-header=localhost:4000

