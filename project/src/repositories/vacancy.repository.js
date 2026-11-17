const db = require('../config/db');   

module.exports = {
  async findAll() {
    const { rows } = await db.query(
      "SELECT * FROM vacancies ORDER BY created_at DESC"
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await db.query(
      "SELECT * FROM vacancies WHERE id = $1", [id]
    );
    return rows[0] || null;
  },

  async create({ title, description, company, salary }) {
    const { rows } = await db.query(
      `INSERT INTO vacancies (title, description, company, salary)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, description, company, salary]
    );
    return rows[0];
  },

  async update(id, { title, description, company, salary }) {
    const { rows } = await db.query(
      `UPDATE vacancies
       SET title=$1, description=$2, company=$3, salary=$4
       WHERE id=$5 RETURNING *`,
      [title, description, company, salary, id]
    );
    return rows[0] || null;
  },

  async remove(id) {
    const { rowCount } = await db.query(
      "DELETE FROM vacancies WHERE id = $1", [id]
    );
    return rowCount > 0;
  },
};
