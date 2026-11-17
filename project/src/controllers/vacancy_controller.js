const svc = require('../services/vacancy.service');

module.exports = {
  // GET /api/v1/vacancies
  async getAll(req, res, next) {
    try {
      const items = await svc.list();
      res.json(items);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/v1/vacancies/:id:pwd
  async getOne(req, res, next) {
    try {
      const v = await svc.get(req.params.id);
      res.json(v);
    } catch (e) {
      next(e);
    }
  },

  // POST /api/v1/vacancies
  async create(req, res, next) {
    try {
      const v = await svc.create(req.body);
      res.status(201).json(v);
    } catch (e) {
      next(e);
    }
  },

  // PUT /api/v1/vacancies/:id
  async update(req, res, next) {
    try {
      const v = await svc.update(req.params.id, req.body);
      res.json(v);
    } catch (e) {
      next(e);
    }
  },

  // DELETE /api/v1/vacancies/:id
  async remove(req, res, next) {
    try {
      await svc.remove(req.params.id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
};
