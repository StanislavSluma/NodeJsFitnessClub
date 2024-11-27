const db = require('./db');

async function createWorkout({ price, day, start_time, end_time, category_id, group_id, hall_id }) {
    const query = `
    INSERT INTO Workout (price, day, start_time, end_time, category_id, group_id, hall_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
    const values = [price, day, start_time, end_time, category_id, group_id, hall_id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getWorkoutById(id) {
    const query = `SELECT * FROM Workout WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateWorkout(id, { price, day, start_time, end_time, category_id, group_id, hall_id }) {
    const query = `
    UPDATE Workout
    SET price = $1, day = $2, start_time = $3, end_time = $4, category_id = $5, group_id = $6, hall_id = $7
    WHERE id = $8
    RETURNING *;
  `;
    const values = [price, day, start_time, end_time, category_id, group_id, hall_id, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteWorkout(id) {
    const query = `DELETE FROM Workout WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getWorkoutsByHallId(hall_id) {
    const query = `
    SELECT * FROM Workout WHERE hall_id = $1;
    `;
    const result = await db.query(query, [hall_id]);
    return result.rows;
}

module.exports = {
    createWorkout,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutsByHallId,
};