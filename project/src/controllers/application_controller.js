const svc = require("../services/application.service");

module.exports = {
  async apply(req, res, next) {
    try {
      const app = await svc.apply(req.session.userId, req.params.id, req.body);
      res.status(201).json(app);
    } catch (e) { next(e); }
  },

  async myApplications(req, res, next) {
    try {
      res.json(await svc.getMyApplications(req.session.userId));
    } catch (e) { next(e); }
  },

  async vacancyResponses(req, res, next) {
    try {
      res.json(await svc.getVacancyResponses(req.session.userId, req.params.id));
    } catch (e) { next(e); }
  },
};
