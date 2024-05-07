const Room = require('../models/room');


class RoomController {
    // [GET] /rooms
    async roomByID(req, res, next) {
        try {
            const _id = req.params.idRoom;

            if (_id == 'allRooms') {
                const rooms = await Room.getAllRoom();

                if (!rooms) {
                    throw Error('Not found any room');
                }

                res.status(200).json({
                    'rooms': rooms
                });
            } else {
                const room = await Room.getRoom(_id);

                if (!room) {
                    throw Error('Not found any room');
                }

                res.status(200).json({
                    'room': room
                });
            }
        } catch (err) {
            res.status(404).json({
                'error': err.message
            });
        }
    }


}

module.exports = new RoomController;