const express = require('express');
const router = express.Router();

const scheduleController = require('../app/controllers/ScheduleController');

// userController
router.post('/add', scheduleController.add)
router.get('/get/:_idSchedule', scheduleController.get)
router.patch('/update/:_idSchedule/status', scheduleController.updateStatus)
router.post('/update/:_idSchedule', scheduleController.update)
router.get('/cron', scheduleController.cron)
router.delete('/delete/:_idSchedule', scheduleController.deleteSchedule)

module.exports = router;