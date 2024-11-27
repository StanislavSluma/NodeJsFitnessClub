const express = require('express');
const router = express.Router();
const ClubCardController = require('../controllers/ClubCardController');
const {ensureClient, ensureAdmin, ensureRole} = require("../middleware/CheckRole");

router.post('/create', ensureClient, ClubCardController.ClubCardCreate);
router.post('/category/create', ensureAdmin, ClubCardController.ClubCardCategoryCreate);

router.get('/all', ensureAdmin, ClubCardController.AllClubCards);
router.get('/category/all', ensureAdmin, ClubCardController.AllClubCardCategories);
router.get('/client/:id', ensureClient, ClubCardController.ClientClubCardInfo);
router.get('/:id', ensureAdmin, ClubCardController.ClubCardInfo);
router.get('/category/:id', ensureAdmin, ClubCardController.ClubCardCategoryInfo);

router.put('/:id/update', ensureAdmin, ClubCardController.ClubCardUpdate);
router.put('/category/:id/update', ensureAdmin, ClubCardController.ClubCardCategoryUpdate);

router.delete('/:id/delete', ensureRole(['admin', 'client']), ClubCardController.ClubCardDelete);
router.delete('/category/:id/delete', ensureAdmin, ClubCardController.ClubCardCategoryDelete);

module.exports = router;