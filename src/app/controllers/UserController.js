const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { generateToken, verifyToken, getUserByToken } = require('../../util/token')
const { addUser, changePassword } = require('../../util/users')

class UserController {

    // [POST] users/login 
    // login
    async login(req, res, next) {
        try {
            console.log(req.body)
            const { username, password } = req.body;
            const user = await User.findOne({
                username: username,
                password: password,
            });

            // make response

            if (!user) {
                throw new Error('NOT FOUND USER');
            }

            const token = await generateToken(user._id);
            res.status(200).json({
                'token': token
            });
        } catch (err) {
            res.status(404).json({
                'msg': err.message
            });
        }


    }
    // [POST] users/verifyToken
    // login
    async verifyToken(req, res, next) {
        try {
            var token = req.headers.authorization;
            var newToken = await verifyToken(token);
            if (!newToken) {
                throw new Error('Invalid Token');
            }

            res.status(200).json({
                'token': newToken
            });
        } catch (err) {
            res.status(400).json({
                'msg': err.message
            });
        }
    }
    // [POST] users/register
    // login
    async register(req, res, next) {
        try {
            const user = req.body
            await addUser(user);

            res.status(201).json({
                'msg': 'Successful'
            });


        } catch (err) {
            res.status(400).json({
                'msg': err.message
            });
        }

    }
    // [PATCH] users/changePassword
    // login
    async changePassword(req, res, next) {
        try {
            var token = req.headers.authorization;

            const user = await getUserByToken(token)

            if (!user) {
                throw new Error('Invalid Token')
            }

            await User.changePassword(user._id, req.body.password);

            res.status(200).json({
                'msg': 'Successful'
            });

        } catch (err) {
            res.status(400).json({
                'msg': err.message
            });
        }
    }


}


module.exports = new UserController; // Tạo một instance cho RoomController

//const RoomController = require('./RoomController');