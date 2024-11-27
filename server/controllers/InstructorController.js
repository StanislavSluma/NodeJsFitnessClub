const Role = require('../models/Role');
const User = require('../models/User');
const Instructor = require('../models/Instructor');
const InstructorWorkout = require('../models/InstructorWorkout');

const Profile = async(req, res) => {
    const instructor_id = req.params.id;

    const instructor = await Instructor.findById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    return res.status(200).json({instructor: instructor});
}

const ProfileUpdate = async(req, res) => {
    const instructor_id = req.params.id;
    const {name, surname, patronymic, phone_number, age} = req.body;

    const instructor = await Instructor.findById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    instructor.name = name;
    instructor.surname = surname;
    instructor.patronymic = patronymic;
    instructor.phone_number = phone_number;
    instructor.age = age;
    // instructor.about = about;
    // instructor.url_photo = url_photo;

    await instructor.save();

    return res.status(200).json({instructor: instructor});
}

const ProfileDelete = async(req, res) => {
    const instructor_id = req.params.id;

    const instructor = await Instructor.findById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    await InstructorWorkout.deleteMany({instructor_id: instructor_id});
    await User.findByIdAndDelete(instructor.user_id);
    await Instructor.findByIdAndDelete(instructor_id);

    return res.status(200).json();
}

const ProfileCreate = async(req, res) => {
    const {username, email, password, name, surname, patronymic, age, phone_number, url_photo} = req.body;

    const user_exist = await User.findOne({username: username});
    if (user_exist) {
        return res.status(400).json({message: "User already exist"});
    }

    const role_id = await Role.findOne({name: 'instructor'});
    const user = new User({username, email, password, role_id});
    const saved_user = await user.save();

    const instructor =
        new Instructor({name, surname, patronymic, phone_number, age, url_photo, user_id: saved_user._id});
    const save_instructor = await instructor.save();

    return res.status(200).json({instructor: save_instructor});
}

const AllInstructors = async(req, res) => {
    return res.status(200).json({instructors: await Instructor.find()});
}

module.exports.Profile = Profile;
module.exports.ProfileCreate = ProfileCreate;
module.exports.ProfileUpdate = ProfileUpdate;
module.exports.ProfileDelete = ProfileDelete;

module.exports.AllInstructors = AllInstructors;