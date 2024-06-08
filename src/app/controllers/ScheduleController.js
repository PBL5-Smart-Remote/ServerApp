const { multipleMongooseToObject } = require('../../util/mongoose');
const Schedule = require('../models/schedule');

class ScheduleController {

    // [POST] /add
    async add(req, res) {
        try {
            var newSchedule = await Schedule(req.body)
            console.log(newSchedule);
            await newSchedule.save();

            res.status(200).json({
                'STATUS': 'Succesful'
            });
        } catch (e) {
            res.status(409).json({
                'STATUS': 'Failure'
            });
        }
    }

    // [GET] /get/:_idSchedule
    async get(req, res) {
        try {
            const _id = req.params._idSchedule;
            if (_id == 'allSchedules') {
                const schedules = await Schedule.getAll();

                if (!schedules) {
                    throw Error('Not found any Schedules')
                }

                res.status(200).json({
                    'schedules': schedules
                });
            } else {
                const scheduleFound = await Schedule.getSchedule(_id);

                if (!scheduleFound) {
                    throw Error('Not found any Schedule')
                }

                res.status(200).json({
                    'schedule': scheduleFound
                });
            }
        } catch (e) {
            res.status(409).json({
                'STATUS': e.toString()
            });
        }
    }

    // [POST] /update/:_idSchedule
    async update(req, res) {
        try {
            const _id = req.params._idSchedule;
            const scheduleFound = await Schedule.getSchedule(_id);

            if (!scheduleFound) {
                throw Error('Not found any Schedule')
            }

            var newSchedule = await Schedule(req.body)
            console.log(newSchedule);
            await newSchedule.save();

            await Schedule.findByIdAndDelete(_id)

            res.status(200).json({
                'STATUS': "UPDATED SUCCESSFUL",
                '_id': newSchedule._id
            });

        } catch (e) {
            res.status(409).json({
                'STATUS': e.toString()
            });
        }
    }

    //
    async cron(req, res) {
        try {
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Convert to Vietnam time
            const weekday = vietnamTime.getUTCDay(); // Get weekday (0-6, where 0 is Sunday and 6 is Saturday)
            const hh = vietnamTime.getUTCHours();
            const mm = vietnamTime.getMinutes();

            var devicesStatus = await Schedule.getDevicesStatus(weekday, hh, mm);

            if (devicesStatus == []) {
                res.status(404).json({
                    'Msg': 'Not found any schedule'
                });
            }

            res.status(200).json({
                'devicesStatus': devicesStatus,
            });
        } catch (e) {
            res.status(200).json({
                'devicesStatus': devicesStatus,
            });
        }
    }

    // [PATCH] update/:_idSchedule/status
    async updateStatus(req, res, next) {
        try {
            const _id = req.params._idSchedule;
            const scheduleFound = await Schedule.getSchedule(_id);

            const isActive = req.body.isActive;

            if (!scheduleFound) {
                throw Error('Not found any Schedule')
            }

            const newSchedule = await Schedule.updateStatus(_id, isActive);

            res.status(200).json({
                'STATUS': "UPDATED SUCCESSFUL",
                '_id': newSchedule._id
            });

        } catch (e) {
            res.status(409).json({
                'STATUS': e.toString()
            });
        }
    }

    // [DELETE] delete/:_idSchedule
    async deleteSchedule(req, res, next) {
        try {
            const _id = req.params._idSchedule;
            const scheduleFound = await Schedule.getSchedule(_id);

            if (!scheduleFound) {
                throw Error('Not found any Schedule')
            }

            await Schedule.deleteSchedule(_id)

            res.status(200).json({
                'STATUS': "DELETED SUCCESSFUL",
            });

        } catch (e) {
            res.status(409).json({
                'STATUS': e.toString()
            });
        }
    }
}


module.exports = new ScheduleController; 
