//Defining a Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const Device = new Schema({
//     name: { type: String, required: false },
//     pin: { type: String, required: true },
//     type: { type: String, required: false, default: "FAN" }, // FAN, DOOR, LIGHT
//     isConnected: { type: Boolean, default: true },
//     status: { type: Number, default: 0 } // -1: notConnected, 0: OFF, 1: ON
// }, {
//     timestamps: true,
// });

const User = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    phoneNumber: { type: String, required: true }
}, {
    timestamps: true,
    statics: {
        async getUser(_idUser) {
            return await this.findById(_idUser);
        },
        async findByEmail(email) {
            return this.findOne({ email: email });
        },
        async findByUsername(username) {
            return await this.findOne({ username: username });
        },
        async findByPhoneNumber(phoneNumber) {
            return await this.findOne({ phoneNumber: phoneNumber });
        },
        async changePassword(_id, password) {
            return await this.findByIdAndUpdate(_id, { password: password });
        },
        async addUser(user) {
            const newUser = await this(user);
            await newUser.save();
        }
    }
});

module.exports = mongoose.model('User', User);