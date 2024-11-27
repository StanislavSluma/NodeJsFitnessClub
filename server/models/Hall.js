const db = require('./db');

async function createHall({ name, city, street, house_number }) {
    const query = `
    INSERT INTO Hall (name, city, street, house_number)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [name, city, street, house_number];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getHallById(id) {
    const query = `SELECT * FROM Hall WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateHall(id, { name, city, street, house_number }) {
    const query = `
    UPDATE Hall
    SET name = $1, city = $2, street = $3, house_number = $4
    WHERE id = $5
    RETURNING *;
  `;
    const values = [name, city, street, house_number, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteHall(id) {
    const query = `DELETE FROM Hall WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getHalls() {
    const query = `SELECT * FROM Hall`;
    const result = await db.query(query);
    return result.rows;
}

module.exports = {
    createHall,
    getHallById,
    updateHall,
    deleteHall,
    getHalls,
};