const Role = require('../models/Role');
const User = require('../models/User');
const Instructor = require('../models/Instructor');
const InstructorWorkout = require('../models/InstructorWorkout');

const Profile = async(req, res) => {
    const instructor_id = req.params.id;

    const instructor = await Instructor.getInstructorById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    return res.status(200).json({instructor: instructor});
}

const ProfileUpdate = async(req, res) => {
    const instructor_id = req.params.id;
    const {name, surname, patronymic, phone_number, age} = req.body;

    const instructor = await Instructor.getInstructorById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    const new_instructor = await Instructor.updateInstructor(instructor_id, {name, surname, patronymic, phone_number, age});

    return res.status(200).json({instructor: new_instructor});
}

const ProfileDelete = async(req, res) => {
    const instructor_id = req.params.id;

    const instructor = await Instructor.getInstructorById(instructor_id);
    if (!instructor) {
        return res.status(404).json({message: 'Instructor not found'});
    }

    await InstructorWorkout.deleteByInstructorId(instructor_id);
    await User.deleteAccount(instructor.user_id);

    return res.status(200).json();
}

const ProfileCreate = async(req, res) => {
    const {username, email, password, name, surname, patronymic, age, phone_number, url_photo} = req.body;

    const user_exist = await User.getAccountByUsername(username);
    if (user_exist) {
        return res.status(400).json({message: "User already exist"});
    }

    const role_id = await Role.getRoleByName('instructor');
    const user = await User.createAccount({username, password, role_id});

    const instructor =
        await Instructor.createInstructor({name, surname, patronymic, phone_number, age, url_photo, account_id: user.id});

    return res.status(200).json({instructor: instructor});
}

const AllInstructors = async(req, res) => {
    return res.status(200).json({instructors: await Instructor.getInstructors()});
}

module.exports.Profile = Profile;
module.exports.ProfileCreate = ProfileCreate;
module.exports.ProfileUpdate = ProfileUpdate;
module.exports.ProfileDelete = ProfileDelete;

module.exports.AllInstructors = AllInstructors;