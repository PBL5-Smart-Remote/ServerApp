const User = require('../app/models/User');

module.exports = {
    addUser: async function addUser(user) {
        var validateUser = null

        validateUser = await User.findByUsername(user.username)
        if (validateUser) {
            throw new Error(`Existed a user has username = ${user.username}`)
        }

        validateUser = await User.findByEmail(user.email)
        if (validateUser) {
            throw new Error(`Existed a user has email = ${user.email}`)
        }

        validateUser = await User.findByPhoneNumber(user.phoneNumber)
        if (validateUser) {
            throw new Error(`Existed a user has phoneNumber = ${user.phoneNumber}`)
        }

        User.addUser(user);

        return User.findById(user._id);
    },
};