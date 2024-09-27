const express = require("express");
const respuesta = require("../../red/respuestas");
const controlador = require("./index");

const router = express.Router();

router.get("/login", login);

// Ruta y su funcion
async function login(req, res, next) {
  const { usuario, password } = req.body;
  try {
    const token = await controlador.login(usuario, password);
    respuesta.success(req, res, token, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
