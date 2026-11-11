const express = require("express");
const path = require("path");
const router = express.Router();


const {createUser, loginUser, updateUser, logoutUser} = require("../controllers/user_controller");

router.get("/", (req, resp) => {
    resp.send("First Page (/)");
});

router.get("/main", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "main.html"));
});

router.get("/add", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..",  "public", "add.html"));
});



router.get("/register", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "register.html"));
});


router.get("/login", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "login.html")); 
});

router.get("/user", (req, resp) => {
    resp.sendFile(path.join(__dirname, "..", "public", "user.html"));
});




router.post("/register", createUser);
router.put("/register/:id", updateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);



router.get("/me", (req, resp) => {
  if (!req.session.userId) return resp.status(401).json({ error: "no auth" });
  resp.json({ userId: req.session.userId });
});


module.exports = router;
