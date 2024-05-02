const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ESP = new Schema({
    name: { type: String, required: false },
    _idESP: { type: String, maxLength: 255 },
    numDevices: { type: Number, required: true },
    isConnected: { type: Boolean, default: true },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'device' }],
}, {
    timestamps: true,
    statics: {
        async getInfo(_idESP) {
            return await this.findOne({ _idESP: _idESP })
                .populate({ path: 'devices' });
        },
        async addESP(esp) {
            const espNew = await this(esp);
            await espNew.save();
        }
    }
});

module.exports = mongoose.model('esp', ESP);