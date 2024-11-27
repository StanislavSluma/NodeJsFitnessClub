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

    const client = await Client.findByIdAndUpdate(client_id, {name, surname, patronymic, phone_number, age}, {new: true});
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
    await new ClientGroup({client_id: client_id, group_id: group_id}).save();
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