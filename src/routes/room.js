const express = require('express');
const router = express.Router();

const roomController = require('../app/controllers/RoomController');

// userController
router.get('/:idRoom', roomController.roomByID);

module.exports = router;