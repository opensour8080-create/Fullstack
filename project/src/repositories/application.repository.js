const db = require("../config/db");

module.exports = {
  async findByUserAndVacancy(userId, vacancyId) {
    const { rows } = await db.query(
      "SELECT * FROM applications WHERE user_id = $1 AND vacancy_id = $2",
      [userId, vacancyId]
    );
    return rows[0] || null;
  },

  async create({ userId, vacancyId, coverLetter }) {
    const { rows } = await db.query(
      `INSERT INTO applications (user_id, vacancy_id, cover_letter)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, vacancyId, coverLetter || ""]
    );
    return rows[0];
  },

  async findByApplicant(userId) {
    const { rows } = await db.query(
      `SELECT a.id, a.cover_letter, a.status, a.created_at,
              v.id AS vacancy_id, v.title, v.company, v.salary
       FROM applications a
       JOIN vacancies v ON a.vacancy_id = v.id
       WHERE a.user_id = $1
       ORDER BY a.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async findByVacancy(vacancyId) {
    const { rows } = await db.query(
      `SELECT a.id, a.cover_letter, a.status, a.created_at,
              u.id AS user_id, u.name, u.email
       FROM applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.vacancy_id = $1
       ORDER BY a.created_at DESC`,
      [vacancyId]
    );
    return rows;
  },
};
