const db = require('../db/connection');

async function addClientToGroup(group_id, client_id) {
    const query = `
    INSERT INTO Group_Client (group_id, client_id)
    VALUES ($1, $2);
  `;
    await db.query(query, [group_id, client_id]);
}

async function removeClientFromGroup(group_id, client_id) {
    const query = `
    DELETE FROM Group_Client
    WHERE group_id = $1 AND client_id = $2;
  `;
    await db.query(query, [group_id, client_id]);
}

async function getGroupByClientId(client_id) {
    const query = `
    SELECT * FROM Group_Client
    WHERE client_id = $1;
  `;
    const result = await db.query(query, [client_id]);
    return result.rows;
}

async function getGroupByPair(client_id, group_id) {
    const query = `
    SELECT * FROM Group_Client
    WHERE client_id = $1 AND group_id = $2;
  `;
    const result = await db.query(query, [client_id, group_id]);
    return result.rows[0];
}

async function deleteByGroupId(group_id) {
    const query = `
    DELETE FROM Group_Client
    WHERE client_id = $1;`
    await db.query(query, [group_id]);
}

async function getGroupsByClientId(client_id) {
    const query = `
        SELECT * FROM StudyGroup WHERE group_id IN 
            (SELECT group_id FROM Group_Client WHERE client_id = $1)
    `;
    const result = await db.query(query, [client_id]);
    return result.rows;
}

module.exports = {
    getGroupByPair,
    removeClientFromGroup,
    getGroupByClientId,
    addClientToGroup,
    deleteByGroupId,
    getGroupsByClientId,
};