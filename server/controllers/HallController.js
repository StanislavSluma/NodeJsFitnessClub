const Hall = require('../models/Hall');
const Workout = require('../models/Workout');

const HallInfo = async(req, res) => {
    const hall_id = req.params.id;

    const hall = await Hall.findById(hall_id);
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    return res.status(200).json({hall: hall});
}

const HallUpdate = async(req, res) => {
    const hall_id = req.params.id;
    const {name, city, street, house_number} = req.body;

    const hall = await Hall.findByIdAndUpdate(hall_id, {name, city, street, house_number}, {new: true});
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    return res.status(200).json({hall: hall});
}

const HallDelete = async(req, res) => {
    const hall_id = req.params.id;

    const hall = await Hall.findById(hall_id);
    if (!hall) {
        return res.status(404).json({message: 'Hall not found'});
    }

    const workouts = await Workout.find({hall_id: hall_id})
    for await (const workout of workouts) {
        workout.hall_id = null;
    }
    await Hall.findByIdAndDelete(hall_id);

    return res.status(200).json();
}

const HallCreate = async(req, res) => {
    const {name, city, street, house_number} = req.body;

    const hall = new Hall({name, city, street, house_number});
    const saved_hall = await hall.save();

    return res.status(200).json({hall: saved_hall});
}

const AllHalls = async(req, res) => {
    return res.status(200).json({coupons: await Hall.find()});
}

module.exports.HallInfo = HallInfo;
module.exports.HallCreate = HallCreate;
module.exports.HallUpdate = HallUpdate;
module.exports.HallDelete = HallDelete;

module.exports.AllHalls = AllHalls;