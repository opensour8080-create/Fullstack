const repo = require("../repositories/vacancy.repository");

const httpError = (status, message) =>
  Object.assign(new Error(message), { status });

module.exports = {
  async list() {
    return repo.findAll();
  },

  async listByUser(userId) {
    return repo.findByUserId(userId);
  },

  async get(id) {
    const v = await repo.findById(id);
    if (!v) throw httpError(404, "Not found");
    return v;
  },

  async create(userId, dto) {
    this.validate(dto);
    return repo.create({ ...dto, userId });
  },

  async update(userId, id, dto) {
    this.validate(dto);
    const existing = await repo.findById(id);
    if (!existing) throw httpError(404, "Not found");
    if (String(existing.user_id) !== String(userId)) {
      throw httpError(403, "Forbidden");
    }
    return repo.update(id, dto);
  },

  async remove(userId, id) {
    const existing = await repo.findById(id);
    if (!existing) throw httpError(404, "Not found");
    if (String(existing.user_id) !== String(userId)) {
      throw httpError(403, "Forbidden");
    }
    await repo.remove(id);
  },

  validate({ title, salary }) {
    if (!title || typeof title !== "string" || title.trim() === "") {
      throw httpError(400, "title is required");
    }
    if (title.length > 200) {
      throw httpError(400, "title too long");
    }
    if (salary !== undefined && salary !== null && salary !== "" && Number(salary) < 0) {
      throw httpError(400, "salary must be non-negative");
    }
  },
};

