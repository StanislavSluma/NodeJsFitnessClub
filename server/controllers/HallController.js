const Hall = require('../models/Hall');
const Workout = require('../models/Workout');

const HallInfo = async(req, res) => {
    const hall_id = req.params.id;

    const hall = await Hall.getHallById(hall_id);
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    return res.status(200).json({hall: hall});
}

const HallUpdate = async(req, res) => {
    const hall_id = req.params.id;
    const {name, city, street, house_number} = req.body;

    const hall = await Hall.updateHall(hall_id, {name, city, street, house_number});
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    return res.status(200).json({hall: hall});
}

const HallDelete = async(req, res) => {
    const hall_id = req.params.id;

    const hall = await Hall.getHallById(hall_id);
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    //const workouts = await Workout.getWorkoutsByHallId(hall_id)

    await Hall.deleteHall(hall_id);

    return res.status(200).json();
}

const HallCreate = async(req, res) => {
    const {name, city, street, house_number} = req.body;

    const hall = await Hall.createHall({name, city, street, house_number});

    return res.status(200).json({hall: saved_hall});
}

const AllHalls = async(req, res) => {
    return res.status(200).json({halls: await Hall.getHalls()});
}

module.exports.HallInfo = HallInfo;
module.exports.HallCreate = HallCreate;
module.exports.HallUpdate = HallUpdate;
module.exports.HallDelete = HallDelete;

module.exports.AllHalls = AllHalls;