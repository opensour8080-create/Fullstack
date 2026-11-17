const repo = require('../repositories/vacancy.repository');


const httpError = (status, message) =>
  Object.assign(new Error(message), { status });

module.exports = {

  async list() {
    return repo.findAll();
  },

  
  async get(id) {
    const v = await repo.findById(id);
    if (!v) throw httpError(404, 'Not found');
    return v;
  },

  
  async create(dto) {
    this.validate(dto);
    return repo.create(dto);
  },

  
  async update(id, dto) {
    this.validate(dto);
    const v = await repo.update(id, dto);
    if (!v) throw httpError(404, 'Not found');
    return v;
  },

  
  async remove(id) {
    const ok = await repo.remove(id);
    if (!ok) throw httpError(404, 'Not found');
  },

  
  validate({ title, salary }) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw httpError(400, 'title is required');
    }
    if (title.length > 200) {
      throw httpError(400, 'title too long');
    }
    if (salary != null && (typeof salary !== 'number' || salary < 0)) {
      throw httpError(400, 'salary must be a non-negative number');
    }
  },
};
