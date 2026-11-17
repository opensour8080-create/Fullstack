const pool = require("../config/db");

const toUser = (r) => ({ id: r.id, name: r.name, email: r.email });

module.exports = {
  async create({ name, email, passwordHash }) {
    const { rows } = await pool.query(
      `INSERT INTO users(name, email, password)
       VALUES($1,$2,$3)
       RETURNING id, name, email`,
      [name, email, passwordHash]
    );
    return toUser(rows[0]);
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, name, email FROM users WHERE id=$1`, [id]
    );
    return rows[0] ? toUser(rows[0]) : null;
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT id, name, email, password FROM users WHERE email=$1`, [email]
    );
    return rows[0] || null;
  },

  async update(id, { name, email, passwordHash }) {
    let rows;
    if (passwordHash) {
      ({ rows } = await pool.query(
        `UPDATE users SET name=$1, email=$2, password=$3
         WHERE id=$4 RETURNING id, name, email`,
        [name, email, passwordHash, id]
      ));
    } else {
      ({ rows } = await pool.query(
        `UPDATE users SET name=$1, email=$2
         WHERE id=$3 RETURNING id, name, email`,
        [name, email, id]
      ));
    }
    return rows[0] ? toUser(rows[0]) : null;
  },
};
