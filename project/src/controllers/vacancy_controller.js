const svc = require("../services/vacancy.service");

module.exports = {
  async getAll(req, res, next) {
    try {
      res.json(await svc.list());
    } catch (e) { next(e); }
  },

  async getMy(req, res, next) {
    try {
      res.json(await svc.listByUser(req.session.userId));
    } catch (e) { next(e); }
  },

  async getOne(req, res, next) {
    try {
      res.json(await svc.get(req.params.id));
    } catch (e) { next(e); }
  },

  async create(req, res, next) {
    try {
      const v = await svc.create(req.session.userId, req.body);
      res.status(201).json(v);
    } catch (e) { next(e); }
  },

  async update(req, res, next) {
    try {
      const v = await svc.update(req.session.userId, req.params.id, req.body);
      res.json(v);
    } catch (e) { next(e); }
  },

  async remove(req, res, next) {
    try {
      await svc.remove(req.session.userId, req.params.id);
      res.status(204).end();
    } catch (e) { next(e); }
  },
};

