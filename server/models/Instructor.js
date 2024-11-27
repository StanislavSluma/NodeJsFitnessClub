const db = require('./db');

async function createInstructor({ name, surname, patronymic, age, phone_number, about, url_photo, account_id }) {
    const query = `
    INSERT INTO Instructor (name, surname, patronymic, age, phone_number, about, url_photo, account_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
    const values = [name, surname, patronymic, age, phone_number, about, url_photo, account_id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getInstructorById(id) {
    const query = `SELECT * FROM Instructor WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateInstructor(id, { name, surname, patronymic, age, phone_number, about, url_photo, account_id }) {
    const query = `
    UPDATE Instructor
    SET name = $1, surname = $2, patronymic = $3, age = $4, phone_number = $5, 
        about = $6, url_photo = $7, account_id = $8
    WHERE id = $9
    RETURNING *;
  `;
    const values = [name, surname, patronymic, age, phone_number, about, url_photo, account_id, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteInstructor(id) {
    const query = `DELETE FROM Instructor WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getInstructors() {
    const query = `SELECT * FROM Instructor`;
    const result = await db.query(query);
    return result.rows;
}

module.exports = {
    createInstructor,
    getInstructorById,
    updateInstructor,
    deleteInstructor,
    getInstructors,
};