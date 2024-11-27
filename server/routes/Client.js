const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/CLientController');
const {ensureClient, ensureAdmin, ensureRole} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, ClientController.ProfileCreate)
router.post('/:client_id/addToGroup/:group_id', ensureClient, ClientController.AddClientToGroup)
router.post('/:client_id/leaveGroup/:group_id', ensureRole(['admin', 'client']), ClientController.ClientLeaveGroup)

router.get('/all', ClientController.AllClients);
router.get('/:id', ensureClient, ClientController.Profile);

router.put('/:id/update', ensureClient, ClientController.ProfileUpdate);

module.exports = router;