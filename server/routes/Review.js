const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const {ensureRole} = require("../middleware/CheckRole");

router.post('/create', ensureRole(['admin', 'client', 'instructor']), ReviewController.ReviewCreate);

router.get('/all', ReviewController.AllReviews);
router.get('/:id', ReviewController.ReviewInfo);

router.put('/:id/update', ensureRole(['admin', 'client', 'instructor']), ReviewController.ReviewUpdate);

router.delete('/:id/delete', ensureRole(['admin', 'client', 'instructor']), ReviewController.ReviewDelete);

module.exports = router;