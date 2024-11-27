const Coupon = require('../models/Coupon');
const Client = require('../models/Client');

const CouponInfo = async(req, res) => {
    const coupon_id = req.params.id;

    const coupon = await Coupon.getCouponById(coupon_id);
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    return res.status(200).json({coupon: coupon});
}

const CouponUpdate = async(req, res) => {
    const coupon_id = req.params.id;
    const {name, description, code, discount, end_date} = req.body;

    const coupon = await Coupon.updateCoupon(coupon_id, {name, description, code, discount, end_date});
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    return res.status(200).json({coupon: coupon});
}

const CouponDelete = async(req, res) => {
    const coupon_id = req.params.id;

    const coupon = await Coupon.getCouponById(coupon_id);
    if (!coupon) {
        return res.status(404).json({message: 'Coupon not found'});
    }

    const clients = await Client.getClientWithCouponId(coupon_id)
    for await (const client of clients) {
        await Client.updateClientCoupon(client._id, null)
    }
    await Coupon.deleteCoupon(coupon_id);

    return res.status(200).json();
}

const CouponCreate = async(req, res) => {
    const {name, description, code, discount, end_date} = req.body;

    const coupon_exist = await Coupon.getCouponByCode(code);
    if (coupon_exist) {
        return res.status(400).json({message: "Coupon already exist"});
    }

    let coupon;
    coupon = await Coupon.createCoupon({name, description, code, discount, end_date});

    return res.status(200).json({coupon: coupon});
}

const AllCoupons = async(req, res) => {
    return res.status(200).json({coupons: await Coupon.getCoupons()});
}

module.exports.CouponInfo = CouponInfo;
module.exports.CouponCreate = CouponCreate;
module.exports.CouponUpdate = CouponUpdate;
module.exports.CouponDelete = CouponDelete;

module.exports.AllCoupons = AllCoupons;