const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
class SiteController {

    // [GET] /
    async home(req, res, next) {
        console.log('cron_now');
        res.send('Trang chủ server App');
    }

    async checkDB(req, res, next) {
        try {
            await mongoose.connect(process.env.URL_DB);

            // require('../../app/models/index');
            res.send('Connect successfully!!!');
        } catch (error) {
            res.send('Connect Failure');
        }
    }
}


module.exports = new SiteController; // Tạo một instance cho SiteController
//const SiteController = require('./SiteController');