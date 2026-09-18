const express = require("express");

const rout = express.Router();

const regform = require("../controllers/auth/registion.controller.js");

const loginform = require("../controllers/auth/login.controller.js");

const authveryfay = require("../middleware/auth.middleware.js");

const profileform = require("../controllers/auth/profile.controller.js");

const maketodo = require("../controllers/todo/todo.controller.js");

const todoedite = require("../controllers/todo/todoedite.controller.js");

const gettodo = require("../controllers/todo/todoget.controller.js");

const delet = require("../controllers/todo/deletetodo.controller.js");

rout.post("/todos", authveryfay, maketodo);

rout.post("/reg", regform);

rout.post("/login", loginform);

rout.get("/profile", authveryfay, profileform);

rout.put("/edite/:id", authveryfay, todoedite);

rout.get("/get", authveryfay, gettodo);

rout.delete("/delets/:id", authveryfay, delet);

module.exports = rout;
