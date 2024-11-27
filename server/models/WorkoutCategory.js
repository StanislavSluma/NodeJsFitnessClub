const db = require('./db');

async function createWorkoutCategory({ category_name, category_about }) {
    const query = `
    INSERT INTO WorkoutCategory (category_name, category_about)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const result = await db.query(query, [category_name, category_about]);
    return result.rows[0];
}

async function getWorkoutCategoryById(id) {
    const query = `SELECT * FROM WorkoutCategory WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateWorkoutCategory(id, { category_name, category_about }) {
    const query = `
    UPDATE WorkoutCategory
    SET category_name = $1, category_about = $2
    WHERE id = $3
    RETURNING *;
  `;
    const result = await db.query(query, [category_name, category_about, id]);
    return result.rows[0];
}

async function deleteWorkoutCategory(id) {
    const query = `DELETE FROM WorkoutCategory WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    createWorkoutCategory,
    getWorkoutCategoryById,
    updateWorkoutCategory,
    deleteWorkoutCategory,
};