const Group = require('../models/Group');
const ClientGroup = require('../models/ClientGroup');

const GroupInfo = async(req, res) => {
    const group_id = req.params.id;

    const group = await Group.getStudyGroupById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }
    return res.status(200).json({group: group});
}

const GroupCreateDefault = async(req, res) => {
    const group = await Group.createStudyGroup({name: 'GroupDefault', max_clients: 10, max_workouts: 10, price: 40});
    return res.status(201).json({group: group});
}

const GroupCreate = async(req, res) => {
    const {name, max_clients, max_workouts, price} = req.body;

    const group = await Group.createStudyGroup({name, max_clients, max_workouts, price});
    return res.status(201).json({group: group});
}

const GroupUpdate = async(req, res) => {
    const group_id = req.params.id;
    const {name, max_clients, max_workouts, price} = req.body;

    const group = await Group.updateStudyGroup(group_id, {name, price, max_workouts, max_clients, true});
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    return res.status(200).json({group: group});
}

const GroupDelete = async(req, res) => {
    const group_id = req.params.id;

    const group = await Group.getStudyGroupById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    await ClientGroup.deleteByGroupId({group_id: group_id});
    await Group.deleteStudyGroup(group_id);

    return res.status(204).json();
}

const ClientGroups = async(req, res) => {
    const client_id = req.params.id;

    const groups = await ClientGroup.getGroupsByClientId(client_id);

    return res.status(200).json({groups: groups});
}

const AllGroups = async(req, res) => {
    return res.status(200).json({groups: await Group.getGroups()});
}

module.exports.GroupInfo = GroupInfo;
module.exports.GroupCreate = GroupCreate;
module.exports.GroupUpdate = GroupUpdate;
module.exports.GroupDelete = GroupDelete;

module.exports.GroupCreateDefault = GroupCreateDefault;

module.exports.ClientGroups = ClientGroups;
module.exports.AllGroups = AllGroups;