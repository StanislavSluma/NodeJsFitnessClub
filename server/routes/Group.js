const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');
const {ensureAdmin, ensureClient} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, GroupController.GroupCreate);

router.get('/all', GroupController.AllGroups);
router.get('/:id', GroupController.GroupInfo);
router.get('/by-client/:id', ensureClient, GroupController.ClientGroups);

router.put('/:id/update', ensureAdmin, GroupController.GroupUpdate);

router.delete('/:id/delete', ensureAdmin, GroupController.GroupDelete);

module.exports = router;