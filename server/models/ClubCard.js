const db = require('./db');

async function createClubCard({ end_date, category_id }) {
    const query = `
    INSERT INTO ClubCard (end_date, category_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const result = await db.query(query, [end_date, category_id]);
    return result.rows[0];
}

async function getClubCardById(id) {
    const query = `SELECT * FROM ClubCard WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateClubCard(id, { end_date, category_id }) {
    const query = `
    UPDATE ClubCard
    SET end_date = $1, category_id = $2
    WHERE id = $3
    RETURNING *;
  `;
    const result = await db.query(query, [end_date, category_id, id]);
    return result.rows[0];
}

async function deleteClubCard(id) {
    const query = `DELETE FROM ClubCard WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function deleteClubCardByCategory (id) {
    const query = `DELETE FROM ClubCard WHERE category_id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    deleteClubCardByCategory,
    createClubCard,
    getClubCardById,
    updateClubCard,
    deleteClubCard,
};