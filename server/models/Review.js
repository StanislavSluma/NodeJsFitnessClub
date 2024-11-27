const db = require('./db');

async function createReview({ grade, text, date, time, client_id }) {
    const query = `
    INSERT INTO Review (grade, text, date, time, client_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const result = await db.query(query, [grade, text, date, time, client_id]);
    return result.rows[0];
}

async function getReviewById(id) {
    const query = `SELECT * FROM Review WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateReview(id, { grade, text, date, time, client_id }) {
    const query = `
    UPDATE Review
    SET grade = $1, text = $2, date = $3, time = $4, client_id = $5
    WHERE id = $6
    RETURNING *;
  `;
    const result = await db.query(query, [grade, text, date, time, client_id, id]);
    return result.rows[0];
}

async function deleteReview(id) {
    const query = `DELETE FROM Review WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
};