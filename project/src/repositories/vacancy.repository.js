const db = require('../config/db');   

module.exports = {
  async findAll() {
    const { rows } = await db.query(
      "SELECT * FROM vacancies ORDER BY created_at DESC"
    );
    return rows;
  },

  async findByUserId(userId) {
    const { rows } = await db.query(
      "SELECT * FROM vacancies WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await db.query(
      "SELECT * FROM vacancies WHERE id = $1", [id]
    );
    return rows || null;
  },

  async create({ title, description, company, salary, userId }) {
    const { rows } = await db.query(
      `INSERT INTO vacancies (title, description, company, salary, user_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, company, salary, userId]
    );
    return rows;
  },

  async update(id, { title, description, company, salary }) {
    const { rows } = await db.query(
      `UPDATE vacancies
       SET title=$1, description=$2, company=$3, salary=$4
       WHERE id=$5 RETURNING *`,
      [title, description, company, salary, id]
    );
    return rows || null;
  },

  async remove(id) {
    const { rowCount } = await db.query(
      "DELETE FROM vacancies WHERE id = $1", [id]
    );
    return rowCount > 0;
  },
};

