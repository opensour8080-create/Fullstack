const express = require("express");
const path = require("path");
const router = express.Router();


const {createUser, loginUser, updateUser} = require("../controllers/user_controller");

router.get("/", (req, resp) => {
    resp.send("First Page (/)");
});

router.get("/main", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "main.html"));
});

router.get("/add", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..",  "public", "add.html"));
});


//router.post("/users", user_controller.createUser);
//router.post("");


router.get("/user", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "user.html"));
});


router.get("/login", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "login.html")); 
});



router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.post("/login", loginUser);


module.exports = router;
