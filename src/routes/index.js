const siteRouter = require('./site');
const userRouter = require('./users');

function route(app) {
    /*
    Paramerters
        app: express Instance
    */

    app.use('/users', userRouter);

    app.use('/', siteRouter);
}

module.exports = route;