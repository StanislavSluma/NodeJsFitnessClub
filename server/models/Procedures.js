const db = require('./db');

async function addClientToGroup(clientId, groupId) {
    const query = `CALL add_client_to_group($1, $2);`;
    await db.query(query, [clientId, groupId]);
}

async function addWorkoutToInstructor(workoutId, instructorId) {
    const query = `CALL add_workout_to_instructor($1, $2);`;
    await db.query(query, [workoutId, instructorId]);
}

async function registerClient(username, password, name, surname, patronymic, age, phoneNumber) {
    const query = `
    CALL client_registration($1, $2, $3, $4, $5, $6, $7);
  `;
    await db.query(query, [username, password, name, surname, patronymic, age, phoneNumber]);
}

async function registerInstructor(username, password, name, surname, patronymic, age, phoneNumber, about = null, urlPhoto = null) {
    const query = `
    CALL instructor_registration($1, $2, $3, $4, $5, $6, $7, $8, $9);
  `;
    await db.query(query, [username, password, name, surname, patronymic, age, phoneNumber, about, urlPhoto]);
}

async function removeClient(clientId) {
    const query = `CALL remove_client($1);`;
    await db.query(query, [clientId]);
}

async function removeInstructor(instructorId) {
    const query = `CALL remove_instructor($1);`;
    await db.query(query, [instructorId]);
}

module.exports = {
    addClientToGroup,
    addWorkoutToInstructor,
    registerClient,
    registerInstructor,
    removeClient,
    removeInstructor,
};