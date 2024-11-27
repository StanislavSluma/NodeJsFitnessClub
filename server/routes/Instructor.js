const express = require('express');
const router = express.Router();
const InstructorController = require('../controllers/InstructorController');
const {ensureAdmin, ensureRole, ensureInstructor} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, InstructorController.ProfileCreate);

router.get('/all', InstructorController.AllInstructors);
router.get('/:id', InstructorController.Profile);

router.put('/:id/update', ensureInstructor, InstructorController.ProfileUpdate);

router.delete('/:id/delete', ensureAdmin, InstructorController.ProfileDelete);


module.exports = router;