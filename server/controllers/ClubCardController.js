const ClubCardCategory = require('../models/ClubCardCategory');
const ClubCard = require('../models/ClubCard');
const Client = require('../models/Client');

const ClientClubCardInfo = async(req, res) => {
    const client_id = req.params.id;

    const client = await Client.findById(client_id);
    if (!client) {
        res.status(404).send({message: 'Client not found'});
    }

    const club_card = await ClubCard.findById(client.card_id);
    if (!club_card) {
        return res.status(404).json({message: 'ClubCard not found'});
    }

    const category = await ClubCardCategory.findById(club_card.category_id);
    if (!category) {
        return res.status(404).json({message: 'ClubCardCategory not found'});
    }

    console.log("category", category);
    return res.status(200).json({club_card: club_card, category: category, expenses: client.expenses});
}

const ClubCardInfo = async(req, res) => {
    const club_card_id = req.params.id;

    const club_card = await ClubCard.findById(club_card_id);
    if (!club_card) {
        return res.status(404).json({message: 'ClubCard not found'});
    }

    return res.status(200).json({club_card: club_card});
}

const ClubCardUpdate = async(req, res) => {
    const club_card_id = req.params.id;
    const {category_id, end_date} = req.body;

    const club_card = await ClubCard.findByIdAndUpdate(club_card_id, {category_id, end_date}, {new: true});
    if (!club_card) {
        return res.status(404).json({message: 'ClubCard not found'});
    }
    const category = await ClubCardCategory.findById(club_card.category_id);
    if (!category) {
        return res.status(404).json({message: 'ClubCardCategory not found'});
    }

    return res.status(200).json({club_card: club_card, category: category});
}

const ClubCardDelete = async(req, res) => {
    const club_card_id = req.params.id;

    const club_card = await ClubCard.findById(club_card_id);
    if (!club_card) {
        return res.status(404).json({message: 'ClubCard not found'});
    }

    await Client.findOneAndUpdate({card_id: club_card_id}, {card_id: null}, {new: true})
    await ClubCard.findByIdAndDelete(club_card_id);

    return res.status(200).json();
}

const ClubCardCreate = async(req, res) => {
    const {client_id} = req.body;

    const client = await Client.findById(client_id);
    console.log(client);
    if (client.card_id) {
        await ClubCard.findByIdAndDelete(client.card_id)
    }

    let card_category = 'middle';
    if (client.expenses <= 100) {
        card_category = 'simple';
    }
    if (client.expenses >= 1000) {
        card_category = 'VIP';
    }

    const category = await ClubCardCategory.findOne({name: card_category});
    const club_card = new ClubCard({category_id: category._id, end_date: new Date().setMonth(new Date().getMonth() + 1)});
    const saved_club_card = await club_card.save();
    await Client.findByIdAndUpdate(client_id, {card_id: saved_club_card._id}, {new: true})
    return res.status(200).json({club_card: {card: saved_club_card, category: category}});
}

const AllClubCards = async(req, res) => {
    return res.status(200).json({club_cards: await ClubCard.find()});
}



const ClubCardCategoryInfo = async(req, res) => {
    const club_card_category_id = req.params.id;

    const club_card_category = await ClubCardCategory.findById(club_card_category_id);
    if (!club_card_category) {
        return res.status(404).json({message: 'ClubCardCategory not found'});
    }

    return res.status(200).json({club_card_category: club_card_category});
}

const ClubCardCategoryUpdate = async(req, res) => {
    const club_card_category_id = req.params.id;
    const {name, discount} = req.body;

    const club_card_category = await ClubCardCategory.findByIdAndUpdate(club_card_category_id, {name, discount}, {new: true});
    if (!club_card_category) {
        return res.status(404).json({message: 'ClubCardCategory not found'});
    }

    return res.status(200).json({club_card_category: club_card_category});
}

const ClubCardCategoryDelete = async(req, res) => {
    const club_card_category_id = req.params.id;

    const club_card_category = await ClubCardCategory.findById(club_card_category_id);
    if (!club_card_category) {
        return res.status(404).json({message: 'ClubCardCategory not found'});
    }

    await ClubCard.deleteMany({category_id: club_card_category_id});
    await ClubCardCategory.findByIdAndDelete(club_card_category_id);

    return res.status(200).json();
}

const ClubCardCategoryCreate = async(req, res) => {
    const {name, discount} = req.body;

    const category_exist = await ClubCardCategory.findOne({name: name});
    if (category_exist) {
        return res.status(400).json({message: "ClubCardCategory already exist"});
    }

    const category = new ClubCardCategory({name, discount});
    const saved_category = await category.save();

    return res.status(200).json({category: saved_category});
}

const AllClubCardCategories = async(req, res) => {
    return res.status(200).json({club_card_categories: await ClubCardCategory.find()});
}

module.exports.ClientClubCardInfo = ClientClubCardInfo;
module.exports.ClubCardInfo = ClubCardInfo;
module.exports.ClubCardCreate = ClubCardCreate;
module.exports.ClubCardUpdate = ClubCardUpdate;
module.exports.ClubCardDelete = ClubCardDelete;

module.exports.AllClubCards = AllClubCards;


module.exports.ClubCardCategoryInfo = ClubCardCategoryInfo;
module.exports.ClubCardCategoryCreate = ClubCardCategoryCreate;
module.exports.ClubCardCategoryUpdate = ClubCardCategoryUpdate;
module.exports.ClubCardCategoryDelete = ClubCardCategoryDelete;

module.exports.AllClubCardCategories = AllClubCardCategories;