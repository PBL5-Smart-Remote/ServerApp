const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// userController
// router.get('/:id', roomController.roomByID);
router.post('/login', userController.login);
router.post('/verifyToken', userController.verifyToken);
router.post('/register', userController.register);
router.patch('/changePassword', userController.changePassword);
router.get('/:idUser', userController.getUser);

module.exports = router;