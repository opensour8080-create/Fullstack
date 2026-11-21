const express = require("express");
const router = express.Router();
const { apiAuth } = require("../middlewares/requireAuth");

const { getAll, getMy, getOne, create, remove, update } = require("../controllers/vacancy_controller");
const { apply, myApplications, vacancyResponses } = require("../controllers/application_controller");

// Вакансии
router.get("/vacancies", getAll);
router.get("/vacancies/my", apiAuth, getMy);
router.get("/vacancies/:id", getOne);
router.post("/vacancies", apiAuth, create);
router.put("/vacancies/:id", apiAuth, update);
router.delete("/vacancies/:id", apiAuth, remove);

// Отклики
router.post("/vacancies/:id/apply", apiAuth, apply);
router.get("/vacancies/:id/responses", apiAuth, vacancyResponses);
router.get("/my-applications", apiAuth, myApplications);

module.exports = router;

