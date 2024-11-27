
const db = require('./db');

async function createAccount({ username, password, role_id }) {
   const query = `
    INSERT INTO Account (username, password, role_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
   const values = [username, password, role_id];
   const result = await db.query(query, values);
   return result.rows[0];
}

async function getAccountById(id) {
   const query = `SELECT * FROM Account WHERE id = $1;`;
   const result = await db.query(query, [id]);
   return result.rows[0];
}

async function getAccountByUsername(username) {
   const query = `SELECT * FROM Account WHERE name = $1;`;
   const result = await db.query(query, [username]);
   return result.rows[0];
}

async function updateAccount(id, { username, password, role_id }) {
   const query = `
    UPDATE Account
    SET username = $1, password = $2, role_id = $3
    WHERE id = $4
    RETURNING *;
  `;
   const values = [username, password, role_id, id];
   const result = await db.query(query, values);
   return result.rows[0];
}

async function deleteAccount(id) {
   const query = `DELETE FROM Account WHERE id = $1 RETURNING *;`;
   const result = await db.query(query, [id]);
   return result.rows[0];
}

module.exports = {
   getAccountByUsername,
   createAccount,
   getAccountById,
   updateAccount,
   deleteAccount,
};