require('dotenv').config()
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.URL_DB);

        require('../../app/models/index');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect }