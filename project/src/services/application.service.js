const appRepo = require("../repositories/application.repository");
const vacancyRepo = require("../repositories/vacancy.repository");

const httpError = (status, message) =>
  Object.assign(new Error(message), { status });

module.exports = {
  async apply(userId, vacancyId, { coverLetter }) {
    const vacancy = await vacancyRepo.findById(vacancyId);
    if (!vacancy) throw httpError(404, "Vacancy not found");

    if (String(vacancy.user_id) === String(userId)) {
      throw httpError(400, "Cannot apply to your own vacancy");
    }

    const already = await appRepo.findByUserAndVacancy(userId, vacancyId);
    if (already) throw httpError(409, "Already applied");

    return appRepo.create({ userId, vacancyId, coverLetter });
  },

  async getMyApplications(userId) {
    return appRepo.findByApplicant(userId);
  },

  async getVacancyResponses(ownerId, vacancyId) {
    const vacancy = await vacancyRepo.findById(vacancyId);
    if (!vacancy) throw httpError(404, "Vacancy not found");
    if (String(vacancy.user_id) !== String(ownerId)) {
      throw httpError(403, "Forbidden");
    }
    return appRepo.findByVacancy(vacancyId);
  },
};
