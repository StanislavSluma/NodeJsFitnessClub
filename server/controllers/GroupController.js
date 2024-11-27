const Group = require('../models/Group');
const ClientGroup = require('../models/ClientGroup');

const GroupInfo = async(req, res) => {
    const group_id = req.params.id;

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }
    return res.status(200).json({group: group});
}

const GroupCreate = async(req, res) => {
    const {name, max_clients, max_workouts, price} = req.body;

    const group = new Group({name, max_clients, max_workouts, price});
    await group.save();
    return res.status(201).json({group: group});
}

const GroupUpdate = async(req, res) => {
    const group_id = req.params.id;
    const {name, max_clients, max_workouts, price} = req.body;

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    group.name = name;
    group.max_clients = max_clients;
    group.max_workouts = max_workouts;
    group.price = price;

    await group.save();

    return res.status(200).json({group: group});
}

const GroupDelete = async(req, res) => {
    const group_id = req.params.id;

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    await ClientGroup.deleteMany({group_id: group_id});
    await Group.findByIdAndDelete(group_id);

    return res.status(204).json();
}

const ClientGroups = async(req, res) => {
    const client_id = req.params.id;

    const groups_id = await ClientGroup.find({client_id: client_id});
    let groups = []
    for (const group of groups_id) {
        groups.push(await Group.findById(group.group_id));
    }

    return res.status(200).json({groups: groups});
}

const AllGroups = async(req, res) => {
    return res.status(200).json({groups: await Group.find()});
}

module.exports.GroupInfo = GroupInfo;
module.exports.GroupCreate = GroupCreate;
module.exports.GroupUpdate = GroupUpdate;
module.exports.GroupDelete = GroupDelete;

module.exports.ClientGroups = ClientGroups;
module.exports.AllGroups = AllGroups;