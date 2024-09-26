const express = require("express");
const respuesta = require("../../red/respuestas");
const controlador = require("./controlador");

const router = express.Router();

// Ruta y su funcion

router.get("/", todos);
router.get("/:id", uno);
router.post("/", agregar);
router.put("/", eliminar);

async function todos(req, res, next) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function uno(req, res, next) {
  try {
    const items = await controlador.uno(req.params.id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function agregar(req, res, next) {
  try {
    const items = await controlador.agregar(req.body);
    if (req.body.id == 0) {
      mensaje = "Item guardado con exito";
    } else {
      mensaje = "Item actualizado con exito";
    }
    respuesta.success(req, res, message, 200);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    const items = await controlador.eliminar(req.body);
    respuesta.success(req, res, "Item eliminado", 200);
  } catch (err) {
    next(err);
  }
}
module.exports = router;
