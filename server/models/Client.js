const db = require('./db');

async function createClient({ name, surname, patronymic, age, phone_number, account_id }) {
    const query = `
    INSERT INTO Client (name, surname, patronymic, age, phone_number, account_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [name, surname, patronymic, age, phone_number, account_id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getClients() {
    const query = `
    SELECT * FROM Client;`;
    const result = await db.select(query);
    return result.rows[0];
}

async function getClientById(id) {
    const query = `SELECT * FROM Client WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateClient(id, { name, surname, patronymic, age, phone_number }) {
    const query = `
    UPDATE Client
    SET name = $1, surname = $2, patronymic = $3, age = $4, phone_number = $5
    WHERE id = $6
    RETURNING *;
  `;
    const values = [name, surname, patronymic, age, phone_number, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteClient(id) {
    const query = `DELETE FROM Client WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getClientByCardId(id) {
    const query = `SELECT * FROM Client WHERE card_id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function removeClientsClubCard(id) {
    const query = `
    UPDATE Client
    SET card_id = null
    WHERE id = $2
    RETURNING *;
  `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function updateClientsClubCard(client_id, card_id) {
    const query = `
    UPDATE Client
    SET card_id = $1
    WHERE id = $2
    RETURNING *;
  `;
    const values = [card_id, client_id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getClientWithCouponId(coupon_id) {
    const query = `SELECT * FROM Client WHERE coupon_id = $1;`;
    const result = await db.query(query, [coupon_id]);
    return result.rows[0];
}

async function updateClientCoupon(client_id, coupon_id) {
    const query = `
    UPDATE Client
    SET coupon_id = $2
    WHERE id = $1
    RETURNING *;
  `;
    const values = [id, coupon_id];
    const result = await db.query(query, values);
    return result.rows[0];
}

module.exports = {
    updateClientsClubCard,
    removeClientsClubCard,
    getClientByCardId,
    getClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient,
    getClientWithCouponId,
    updateClientCoupon,
};