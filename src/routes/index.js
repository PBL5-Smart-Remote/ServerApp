const siteRouter = require('./site');
const userRouter = require('./users');
const roomRouter = require('./room')

function route(app) {
    /*
    Paramerters
        app: express Instance
    */
    app.use('/rooms', roomRouter);
    app.use('/users', userRouter);

    app.use('/', siteRouter);
}

module.exports = route;