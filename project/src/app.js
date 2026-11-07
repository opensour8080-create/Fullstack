const express = require("express");
const session = require("express-session");
const app = express();


app.use(express.urlencoded({ extended: true }));  




app.use(session({
    secret:"jist_key_for_my_site",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 9000000, secure:false},
}));


const Router = require("./routers/router.js");
app.use("/", Router);


module.exports = app;
