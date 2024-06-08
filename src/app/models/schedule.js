const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceStatus = {
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Device', // Referencing the Device model
        required: true
    },
    status: {
        type: Number,
        required: true,
        enum: [0, 1] // 0 for OFF, 1 for ON
    }
};

// Define the Schedule schema
const Schedule = new Schema({
    devices: [
        DeviceStatus
    ],
    name: {
        type: String,
        default: '(unnamed)',
        required: true,
    },
    daysOfWeek: {
        type: [Number],
        required: true,
        validate: {
            validator: function (v) {
                return v.every(day => day >= 0 && day <= 6);
            },
            message: props => `${props.value} is not a valid day of the week!`
        }
    },
    time: {
        hour: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        minute: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1] // 0 for Not Active, 1 for Active
    }
}, {
    timestamps: true,
    statics: {
        async getAll() {
            return await this.find();
        },
        async getSchedule(_id) {
            return await this.findById(_id);
        },
        async getDevicesStatus(weekday, hh, mm) {
            const query = {
                daysOfWeek: { $in: [weekday] },
                'time.hour': hh,
                'time.minute': mm,
                isActive: 1
            };

            try {
                const schedulesFound = await this.find(query);

                if (!schedulesFound) {
                    return null;
                }

                var devicesStatus = []
                schedulesFound.forEach(schedule => {
                    schedule.devices.forEach(deviceStatus => {
                        devicesStatus.push(deviceStatus)
                    });
                });

                return devicesStatus;
            } catch (err) {
                console.error('Error finding schedules:', err);
                throw err;
            }
        },
        async updateStatus(_id, isActive) {
            try {
                await this.updateOne({
                    _id: _id
                }, {
                    $set: {
                        isActive: isActive
                    }
                }).catch(err => {
                    throw err
                });

                return await this.findById(_id);
            } catch (err) {
                console.error('Error finding schedules:', err);
                throw err;
            }
        }
    }
});


// Export the Schedule model
module.exports = mongoose.model('Schedule', Schedule);