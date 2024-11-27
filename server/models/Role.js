const db = require('../db/connection');

async function createRole(role) {
    const query = `
    INSERT INTO Role (role) 
    VALUES ($1) 
    RETURNING *;
  `;
    const values = [role];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getRoleById(id) {
    const query = `
    SELECT * FROM Role 
    WHERE id = $1;
  `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateRole(id, newRole) {
    const query = `
    UPDATE Role 
    SET role = $1 
    WHERE id = $2 
    RETURNING *;
  `;
    const values = [newRole, id];

    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteRole(id) {
    const query = `
    DELETE FROM Role 
    WHERE id = $1 
    RETURNING *;
  `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getRoleByName(name) {
    const query = `
    SELECT * FROM Role 
    WHERE name = $1;
  `;
    const result = await db.query(query, [name]);
    return result.rows[0];
}

module.exports = {
    getRoleByName,
    createRole,
    getRoleById,
    updateRole,
    deleteRole,
};