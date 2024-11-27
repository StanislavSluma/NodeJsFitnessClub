const Client = require('../models/Client');
const User = require('../models/User');
const Role = require("../models/Role");
const ClientGroup = require("../models/ClientGroup");
const Group = require("../models/Group");

const ProfileCreate = async(req, res) => {
    const {username, email, password, name, surname, patronymic, age, phone_number} = req.body;

    let user = await User.findOne({username: username})
    if (user) {
        return res.status(400).send({error: 'User already exists'});
    }

    if (username.length < 2) {
        return res.status(400).send({error: 'username too short'});
    }
    let regex = /.+@(gmail.com|yandex.ru)$/;
    if (!regex.test(email)) {
        return res.status(400).send({error: 'incorrect email'});
    }

    if(password.length < 4) {
        return res.status(400).send({error: 'password too short'});
    }

    if(name.length < 2) {
        return res.status(400).send({error: 'name too short'});
    }

    if(age < 18) {
        return res.status(400).send({error: 'age lower then 18'});
    }

    regex = /(\+375 |80)\d{2} \d{3}-\d{2}-\d{2}$/;
    if(regex.test(phone_number)) {
        return res.status(400).send({error: 'phone number incorrect'});
    }

    const role = await Role.findOne({name: 'client'});
    const role_id = role._id;
    user = new User({username, email, password, role_id});
    user = await user.save();
    const user_id = user._id;
    const client = new Client({name, surname, patronymic, age, phone_number, user_id});
    client.save();

    return res.status(200).json({client: client});
}

const Profile = async(req, res) => {
    const client_id = req.params.id;

    const client = await Client.findById(client_id);
    if (!client) {
        return res.status(404).json({message: 'Client not found'});
    }

    return res.status(200).json({client: client});
}

const AllClients = async(req, res) => {
    return res.status(200).json({clients: await Client.find()});
}

const ProfileUpdate = async(req, res) => {
    const client_id = req.params.id;
    const {name, surname, patronymic, phone_number, age} = req.body;

    console.log(req.body);
    const client = await Client.findByIdAndUpdate(client_id, {name, surname, patronymic, phone_number, age}, {new: true});
    console.log(client);
    if (!client) {
        return res.status(404).json({message: 'Client not found'});
    }

    return res.status(200).json({client: client});
}

const ProfileDelete = async(req, res) => {
    const client_id = req.params.id;

    let client = await Client.findById(client_id);
    if (!client) {
        return res.status(404).json({message: 'Client not found'});
    }

    const client_groups = await ClientGroup.find({client_id: client_id});
    for await (const client_group of client_groups) {
        const group = await Group.findById(client_group.group_id);
        group.current_cients -= 1;
        group.save();
    }
    await ClientGroup.deleteMany({client_id: client._id});
    await User.findByIdAndDelete(client.user_id);
    await Client.findByIdAndDelete(client_id);

    return res.status(200).json({client: client});
}

const AddClientToGroup = async(req, res) => {
    const group_id = req.params.group_id;
    const client_id = req.params.client_id;

    console.log(group_id, client_id);

    const client_group_exist = await ClientGroup.findOne({client_id: client_id, group_id: group_id});
    if (client_group_exist) {
        return res.status(400).send({message: 'Client already in Group'});
    }

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }
    if(group.current_clients === group.max_clients) {
        return res.status(400).send({message: 'Group closed'});
    }

    const client = await Client.findById(client_id);
    if (!client) {
        return res.status(400).send({message: 'Client not found'});
    }

    group.current_clients += 1;
    client.expenses += group.price;
    await group.save();
    await client.save();
    await new ClientGroup({client_id: client_id, group_id: group_id}).save();
    return res.status(200).json({message: "Client added to Group!"});
}

const ClientLeaveGroup = async(req, res) => {
    const group_id = req.params.group_id;
    const client_id = req.params.client_id;

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    const client = await Client.findById(client_id);
    if (!client) {
        return res.status(400).send({message: 'Client not found'});
    }

    group.current_clients -= 1;
    await ClientGroup.deleteOne({group_id: group_id, client_id: client_id});
}

module.exports.ProfileCreate = ProfileCreate;
module.exports.Profile = Profile;
module.exports.ProfileUpdate = ProfileUpdate;
module.exports.ProfileDelete = ProfileDelete;

module.exports.AllClients = AllClients;
module.exports.AddClientToGroup = AddClientToGroup;
module.exports.ClientLeaveGroup = ClientLeaveGroup;