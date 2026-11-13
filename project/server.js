const express = require("express");

const port = 8080;
const app = require("./src/app");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./src/routers/router_user"));

app.listen(port);
