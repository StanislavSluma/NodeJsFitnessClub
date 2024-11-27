const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/CouponController');
const {ensureAdmin} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, CouponController.CouponCreate);

router.get('/all', CouponController.AllCoupons);
router.get('/:id', CouponController.CouponInfo);

router.put('/:id/update', ensureAdmin, CouponController.CouponUpdate);

router.delete('/:id/delete', ensureAdmin, CouponController.CouponDelete);

module.exports = router;