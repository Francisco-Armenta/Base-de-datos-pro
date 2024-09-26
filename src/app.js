const express = require("express");
const config = require("./config");

const clientes = require("./modulos/clientes/ruta");

const app = express();

app.set("port", config.app.port);

// rutas
app.use("/api/cliente", clientes);

module.exports = app;
