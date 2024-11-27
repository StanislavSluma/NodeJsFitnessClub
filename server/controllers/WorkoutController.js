const Workout = require('../models/Workout');
const WorkoutCategory = require('../models/WorkoutCategory');
const InstructorWorkout = require('../models/InstructorWorkout');
const Group = require('../models/Group');
const Instructor = require('../models/Instructor');

const WorkoutCategoryInfo = async(req, res) => {
    const workout_category_id = req.params.id;

    const workout_category = await WorkoutCategory.findById(workout_category_id);
    if (!workout_category) {
        return res.status(400).send({message: 'WorkoutCategory not found'});
    }
    return res.status(200).json({workout_category: workout_category});
}

const WorkoutCategoryCreate = async(req, res) => {
    const {name, about} = req.body;

    let workout_category = new WorkoutCategory({name});
    if (about) {
        workout_category = new WorkoutCategory({name, about})
    }
    await workout_category.save();

    return res.status(201).json({workout_category: workout_category});
}

const WorkoutCategoryUpdate = async(req, res) => {
    const workout_category_id = req.params.id;
    const {name, about} = req.body;

    const workout_category = await WorkoutCategory.findById(workout_category_id);
    if (!workout_category) {
        return res.status(400).send({message: 'WorkoutCategory not found'});
    }

    workout_category.name = name;
    workout_category.about = about;

    await workout_category.save();

    return res.status(200).json({workout_category: workout_category});
}

const WorkoutCategoryDelete = async(req, res) => {
    const workout_category_id = req.params.id;

    const workout_category = await WorkoutCategory.findById(workout_category_id);
    if (!workout_category) {
        return res.status(400).send({message: 'WorkoutCategory not found'});
    }

    await Workout.deleteMany({category_id: workout_category_id});
    await WorkoutCategory.findByIdAndDelete(workout_category_id);

    return res.status(204).json();
}

const AllWorkoutCategories = async(req, res) => {
    return res.status(200).json({workout_categories: await WorkoutCategory.find()});
}



const WorkoutInfo = async(req, res) => {
    const workout_id = req.params.id;

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }
    return res.status(200).json({workout: workout});
}

const WorkoutCreate = async(req, res) => {
    const {day, start_date, end_date, category_id} = req.body;

    const workout = new Workout({day, start_date, end_date, category_id});
    await workout.save();
    return res.status(201).json({workout: workout});
}

const WorkoutUpdate = async(req, res) => {
    const workout_id = req.params.id;
    const {day, start_date, end_date, category_id} = req.body;

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }

    workout.day = day;
    workout.category_id = category_id;
    workout.start_date = start_date;
    workout.end_date = end_date;

    await workout.save();

    return res.status(200).json({workout: workout});
}

const WorkoutDelete = async(req, res) => {
    const workout_id = req.params.id;

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }

    await InstructorWorkout.deleteMany({workout_id: workout_id});
    await Workout.findByIdAndDelete(workout._id);

    return res.status(204).json();
}

const AllWorkouts = async(req, res) => {
    return res.status(200).json({workouts: await Workout.find()
            .populate('category_id', 'name')
            .populate('group_id', 'name')
            .populate('hall_id', 'name') });
}

const GroupWorkouts = async(req, res) => {
    const group_id = req.params.id;
    return res.status(200).json({workouts: await Workout.find({group_id: group_id})
            .populate('category_id', 'name')
            .populate('group_id', 'name')
            .populate('hall_id', 'name') });
}

const InstructorWorkouts = async(req, res) => {
    const instructor_id = req.params.id;

    const workouts_id = await InstructorWorkout.find({instructor_id: instructor_id});
    if (!workouts_id) {
        return res.status(400).json({message: "Workout not found"});
    }

    let workouts = []
    for (const workout_id of workouts_id) {
        const workout = await Workout.findById((await workout_id).workout_id)
            .populate('category_id', 'name')
            .populate('group_id', 'name current_clients')
            .populate('hall_id', 'name');

        if (workout) {
            workouts.push(workout);
        }
    }
    return res.status(200).json({workouts: workouts});
}

const AddWorkoutToGroup = async(req, res) => {
    const group_id = req.params.group_id;
    const workout_id = req.params.workout_id;

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }

    const group = await Group.findById(group_id);
    if (!group) {
        return res.status(400).send({message: 'Group not found'});
    }

    workout.group_id = group_id;
    await workout.save();
    return res.status(200).json({message: "Workout added to Group"});
}

const AddWorkoutToInstructor = async(req, res) => {
    const instructor_id = req.params.instructor_id;
    const workout_id = req.params.workout_id;

    const instructor = await Instructor.findById(instructor_id);
    if (!instructor) {
        return res.status(400).send({message: 'Instructor not found'});
    }

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }

    await (new InstructorWorkout({instructor_id: instructor_id, workout_id: workout_id})).save();
    return res.status(200).json({message: "Workout added to Instructor"});
}

const RemoveWorkoutFromInstructor = async(req, res) => {
    const instructor_id = req.params.instructor_id;
    const workout_id = req.params.workout_id;

    const instructor = await Instructor.findById(instructor_id);
    if (!instructor) {
        return res.status(400).send({message: 'Instructor not found'});
    }

    const workout = await Workout.findById(workout_id);
    if (!workout) {
        return res.status(400).send({message: 'Workout not found'});
    }

    await InstructorWorkout.deleteOne({instructor_id: instructor_id, workout_id: workout_id});
    return res.status(200).json({message: "Workout removed from Instructor"});
}

module.exports.WorkoutCategoryInfo = WorkoutCategoryInfo;
module.exports.WorkoutCategoryCreate = WorkoutCategoryCreate;
module.exports.WorkoutCategoryUpdate = WorkoutCategoryUpdate;
module.exports.WorkoutCategoryDelete = WorkoutCategoryDelete;

module.exports.AllWorkoutCategories = AllWorkoutCategories;

module.exports.WorkoutInfo = WorkoutInfo;
module.exports.WorkoutCreate = WorkoutCreate;
module.exports.WorkoutUpdate = WorkoutUpdate;
module.exports.WorkoutDelete = WorkoutDelete;

module.exports.AllWorkouts = AllWorkouts;
module.exports.GroupWorkouts = GroupWorkouts;
module.exports.InstructorWorkouts = InstructorWorkouts;

module.exports.AddWorkoutToGroup = AddWorkoutToGroup;
module.exports.AddWorkoutToInstructor = AddWorkoutToInstructor;
module.exports.RemoveWorkoutFromInstructor = RemoveWorkoutFromInstructor;