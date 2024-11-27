const express = require('express');
const router = express.Router();
const HallController = require('../controllers/HallController');
const {ensureAdmin} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, HallController.HallCreate);

router.get('/all', ensureAdmin, HallController.AllHalls);
router.get('/:id', ensureAdmin, HallController.HallInfo);

router.put('/:id/update', ensureAdmin, HallController.HallUpdate);

router.delete('/:id/delete', ensureAdmin, HallController.HallDelete);

module.exports = router;