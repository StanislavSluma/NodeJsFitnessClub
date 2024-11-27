const db = require('./db');

async function createClubCardCategory({ name, discount }) {
    const query = `
    INSERT INTO ClubCardCategory (name, discount)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const result = await db.query(query, [name, discount]);
    return result.rows[0];
}

async function getClubCardCategoryById(id) {
    const query = `SELECT * FROM ClubCardCategory WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateClubCardCategory(id, { name, discount }) {
    const query = `
    UPDATE ClubCardCategory
    SET name = $1, discount = $2
    WHERE id = $3
    RETURNING *;
  `;
    const result = await db.query(query, [name, discount, id]);
    return result.rows[0];
}

async function getClubCardCategoryByName(name) {
    const query = `SELECT * FROM ClubCardCategory WHERE name = $1;`;
    const result = await db.query(query, [name]);
    return result.rows[0];
}

async function deleteClubCardCategory(id) {
    const query = `DELETE FROM ClubCardCategory WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getAllCategories() {
    const query = `SELECT * FROM ClubCardCategory`;
    const result = await db.query(query);
    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getClubCardCategoryByName,
    createClubCardCategory,
    getClubCardCategoryById,
    updateClubCardCategory,
    deleteClubCardCategory,
};