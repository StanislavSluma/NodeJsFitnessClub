const express = require('express');
const router = express.Router();
const WorkoutController = require('../controllers/WorkoutController');
const {ensureAdmin, ensureRole, ensureAuthenticated, ensureInstructor} = require("../middleware/CheckRole");

router.post('/create', ensureAdmin, WorkoutController.WorkoutCreate);
router.post('/category/create', ensureAdmin, WorkoutController.WorkoutCategoryCreate);
router.post('/:workout_id/addToGroup/:group_id', ensureAdmin, WorkoutController.AddWorkoutToGroup)
router.post('/:workout_id/addToInstructor/:instructor_id', ensureAdmin, WorkoutController.AddWorkoutToInstructor)
router.post('/:workout_id/removeFromInstructor/:instructor_id', ensureAdmin, WorkoutController.RemoveWorkoutFromInstructor)

router.get('/all', ensureAdmin, WorkoutController.AllWorkouts);
router.get('/by-instructor/:id',ensureInstructor, WorkoutController.InstructorWorkouts);
router.get('/by-group/:id', WorkoutController.GroupWorkouts);

router.get('/category/all', WorkoutController.AllWorkoutCategories);
router.get('/:id', ensureRole(['admin', 'instructor']), WorkoutController.WorkoutInfo);
router.get('/category/:id', ensureRole(['admin', 'instructor']), WorkoutController.WorkoutCategoryInfo);

router.put('/category/:id/update', ensureAdmin, WorkoutController.WorkoutCategoryUpdate);
router.put('/:id/update', ensureAdmin, WorkoutController.WorkoutUpdate);

router.delete('/:id/delete', ensureAdmin, WorkoutController.WorkoutDelete);
router.delete('/category/:id/delete', ensureAdmin, WorkoutController.WorkoutCategoryDelete);

module.exports = router;