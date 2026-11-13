const express = require("express");
const router = express.Router();  

const {getAll, getOne, remove, update} = require("../controllers/vacancy_controller");


router.get("/vacancies", getAll);
router.get("/:id", getOne);
router.put(":/id", update);
router.delete("/:id", remove);


module.exports = router; 
