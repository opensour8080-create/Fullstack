const express = require("express");
const router = express.Router();

const { getAll, getOne, create, remove, update } = require("../controllers/vacancy_controller");

router.get("/vacancies", getAll);
router.post("/vacancies", create);
router.get("/vacancies/:id", getOne);
router.put("/vacancies/:id", update);
router.delete("/vacancies/:id", remove);

module.exports = router; 
