const express = require("express");
const respuesta = require("../../red/respuestas");

const router = express.Router();
const controlador = require("./controlador");

router.get("/", (req, res) => {
  const todos = controlador.todos();
  respuesta.success(req, res, todos, 200);
});

module.exports = router;
