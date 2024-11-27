const Role = require('../models/Role');
const User = require('../models/User');
const Client = require('../models/Client');
const Instructor = require('../models/Instructor');
const {sign} = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

const Login = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    if (user.password !== password) {
        return res.status(401).json({message: "Password is incorrect"});
    }

    const role = await Role.findById(user.role_id);
    if (!role) {
        return res.status(404).json({message: "Role not found"});
    }

    let profile = null;
    if (role.name === 'client') {
        profile = await Client.findOne({user_id: user._id});
    }
    if (role.name === 'instructor') {
        profile = await Instructor.findOne({user_id: user._id});
    }
    if (role.name === 'admin') {
        profile = {username: user.username, email: user.email, _id: user._id};
    }

    if (profile == null) {
        return res.status(404).json({message: "Profile not found"});
    }

    const accessToken = sign(
        { id: user._id, role: role.name },
        accessTokenSecret,
        { expiresIn: accessTokenExpiry }
    );

    res.cookie('access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        path: '/',
        SameSite: 'None'
    });

    return res.status(200).json({profile: profile, role: role.name});
}

const Register = async(req, res) => {
    const { username, email, password, password_repeat, name, surname, patronymic, age, phone_number } = req.body;

    console.log(req.body);
    const user_exist = await User.findOne({username: username});
    if (user_exist) {
        console.log('User already exist');
        return res.status(400).json({message: 'User already exist'});
    }
    if (password !== password_repeat) {
        return res.status(401).json({message: "Password is incorrect"});
    }
    if (age < 18) {
        return res.status(400).json({message: "Age is less then 18"});
    }

    const role = await Role.findOne({name: 'client'})

    const user = new User({username: username, email: email, password: password_repeat, role_id: role._id});
    const saved_user = await user.save();

    const client = new Client({name, surname, patronymic, age, phone_number, user_id: saved_user._id});
    await client.save();

    return res.status(200).json({client: client});
}


const Profile = async(req, res) => {
    const accessToken = req.cookies.access;
    let data = null;
    if (accessToken) data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    else return res.status(403).json({message: "Access token not found"});

    console.log(data);
    let profile;
    if (data.role === 'client') {
        const client = await Client.findOne({user_id: data.id});
        if (!client) {
            return res.status(400).json({message: 'Client not found'});
        }
        console.log(client);
        profile = client;
    }
    if (data.role === 'instructor') {
        const instructor = await Instructor.findOne({user_id: data.id});
        if (!instructor) {
            return res.status(400).json({message: 'Instructor not found'});
        }
        profile = instructor;
    }
    if (data.role === 'admin') {
        const user = await User.findById(data.id);
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        profile = {username: user.username, email: user.email, _id: user._id};
    }

    return res.status(200).json({profile: profile, role: data.role});
}

module.exports.Login = Login;
module.exports.Register = Register;
module.exports.Profile = Profile;
