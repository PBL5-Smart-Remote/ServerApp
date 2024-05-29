const express = require('express');
const router = express.Router();

const scheduleController = require('../app/controllers/ScheduleController');

// userController
router.post('/add', scheduleController.add)
router.get('/get/:_idSchedule', scheduleController.get)
router.post('/update/:_idSchedule', scheduleController.update)
router.get('/cron', scheduleController.cron)

module.exports = router;