const db = require('./db');

async function createCoupon({ name, description, code, discount, end_date }) {
    const query = `
    INSERT INTO Coupon (name, description, code, discount, end_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const values = [name, description, code, discount, end_date];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getCouponById(id) {
    const query = `SELECT * FROM Coupon WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function updateCoupon(id, { name, description, code, discount, end_date }) {
    const query = `
    UPDATE Coupon
    SET name = $1, description = $2, code = $3, discount = $4, end_date = $5
    WHERE id = $6
    RETURNING *;
  `;
    const values = [name, description, code, discount, end_date, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function deleteCoupon(id) {
    const query = `DELETE FROM Coupon WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function getCouponByCode(code) {
    const query = `SELECT * FROM Coupon WHERE code = $1;`;
    const result = await db.query(query, [code]);
    return result.rows[0];
}

async function getCoupons() {
    const query = `SELECT * FROM Coupon`;
    const result = await db.query(query);
    return result.rows[0];
}

module.exports = {
    createCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    getCouponByCode,
    getCoupons
};