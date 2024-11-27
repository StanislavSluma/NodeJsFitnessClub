const Coupon = require('../models/Coupon');
const Client = require('../models/Client');

const CouponInfo = async(req, res) => {
    const coupon_id = req.params.id;

    const coupon = await Coupon.findById(coupon_id);
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    return res.status(200).json({coupon: coupon});
}

const CouponUpdate = async(req, res) => {
    const coupon_id = req.params.id;
    const {name, description, code, discount, end_date} = req.body;

    const coupon = await Coupon.findByIdAndUpdate(coupon_id, {name, description, code, discount, end_date}, {new: true});
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    return res.status(200).json({coupon: coupon});
}

const CouponDelete = async(req, res) => {
    const coupon_id = req.params.id;

    const coupon = await Coupon.findById(coupon_id);
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    const clients = await Client.find({coupon_id: coupon_id})
    for await (const client of clients) {
        await Client.findByIdAndUpdate(client._id, {coupon_id: null})
    }
    await Coupon.findByIdAndDelete(coupon_id);

    return res.status(200).json();
}

const CouponCreate = async(req, res) => {
    const {name, description, code, discount, end_date} = req.body;

    const coupon_exist = await Coupon.findOne({code: code});
    if (coupon_exist) {
        return res.status(400).json({message: "Coupon already exist"});
    }

    let coupon;
    if (description) {
        coupon = new Coupon({name, description, code, discount, end_date});
    } else {
        coupon = new Coupon({name, code, discount, end_date});
    }
    const saved_coupon = await coupon.save();

    return res.status(200).json({coupon: saved_coupon});
}

const AllCoupons = async(req, res) => {
    return res.status(200).json({coupons: await Coupon.find()});
}

module.exports.CouponInfo = CouponInfo;
module.exports.CouponCreate = CouponCreate;
module.exports.CouponUpdate = CouponUpdate;
module.exports.CouponDelete = CouponDelete;

module.exports.AllCoupons = AllCoupons;