const db = require('./db');
const {deleteByGroupId} = require("./ClientGroup");

async function assignInstructorToWorkout(instructor_id, workout_id) {
    const query = `
    INSERT INTO Instructor_Workout (instructor_id, workout_id)
    VALUES ($1, $2);
  `;
    await db.query(query, [instructor_id, workout_id]);
}

async function removeInstructorFromWorkout(instructor_id, workout_id) {
    const query = `
    DELETE FROM Instructor_Workout
    WHERE instructor_id = $1 AND workout_id = $2;
  `;
    await db.query(query, [instructor_id, workout_id]);
}

async function deleteByInstructorId(instructor_id) {
    const query = `
    DELETE FROM Instructor_Workout
    WHERE instructor_id = $1;
  `;
    await db.query(query, [instructor_id]);
}

module.exports = {
    assignInstructorToWorkout,
    removeInstructorFromWorkout,
    deleteByInstructorId,
};