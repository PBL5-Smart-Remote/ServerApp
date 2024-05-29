const siteRouter = require('./site');
const userRouter = require('./users');
const roomRouter = require('./room')
const scheduleRouter = require('./schedule')


function route(app) {
    /*
    Paramerters
        app: express Instance
    */
    app.use('/rooms', roomRouter);
    app.use('/users', userRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/', siteRouter);
}

module.exports = route;