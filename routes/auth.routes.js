const express = require("express");

const rout = express.Router();

const regform = require("../../backend/controllers/auth/registion.controller.js");

const loginform = require("../../backend/controllers/auth/login.controller.js");

const authveryfay = require("../../backend/middleware/auth.middleware.js");

const profileform = require("../../backend/controllers/auth/profile.controller.js");

const maketodo = require("../../backend/controllers/todo/todo.controller.js");

const todoedite = require("../../backend/controllers/todo/todoedite.controller.js");
const profile = require("../../backend/controllers/auth/profile.controller.js");

const gettodo = require("../../backend/controllers/todo/todoget.controller.js");

const delet = require("../../backend/controllers/todo/deletetodo.controller.js");

rout.post("/todos", authveryfay, maketodo);

rout.post("/reg", regform);

rout.post("/login", loginform);

rout.get("/profile", authveryfay, profileform);

rout.put("/edite/:id", authveryfay, todoedite);

rout.get("/get", authveryfay, gettodo);

rout.delete("/delets/:id", authveryfay, delet);

module.exports = rout;
