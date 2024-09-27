const express = require("express");
const morgan = require("morgan");
const config = require("./config");

const clientes = require("./modulos/clientes/ruta");
const usuarios = require("./modulos/usuarios/ruta");
const error = require("./red/errors");

const app = express();

// Midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configuracion
app.set("port", config.app.port);

// rutas
app.use("/api/cliente", clientes);
app.use("/api/usuario", usuarios);

app.use(error);

module.exports = app;
