const db = require('./db');

async function createStudyGroup({ name, price, max_workouts, max_clients, is_open }) {
    const query = `
    INSERT INTO StudyGroup (name, price, max_workouts, max_clients, is_open)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const values = [name, price, max_workouts, max_clients, is_open];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getStudyGroupById(id) {
    const query = `SELECT * FROM StudyGroup WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateStudyGroup(id, { name, price, max_workouts, max_clients, is_open }) {
    const query = `
    UPDATE StudyGroup
    SET name = $1, price = $2, max_workouts = $3, max_clients = $4, is_open = $5
    WHERE id = $6
    RETURNING *;
  `;
    const values = [name, price, max_workouts, max_clients, is_open, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteStudyGroup(id) {
    const query = `DELETE FROM StudyGroup WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getGroups() {
    const query = `
    SELECT * FROM StudyGroup;
    `
    const result = await db.query(query);
    return result.rows[0];
}

module.exports = {
    createStudyGroup,
    getStudyGroupById,
    updateStudyGroup,
    deleteStudyGroup,
    getGroups,
};