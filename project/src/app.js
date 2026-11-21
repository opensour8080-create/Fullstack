const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "jist_key_for_my_site",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 9000000, secure: false },
}));

const Router_user = require("./routers/router_user.js");
const Router_vacancies = require("./routers/router_vacancies.js");

app.use("/", Router_user);
app.use("/", Router_vacancies);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

module.exports = app;
