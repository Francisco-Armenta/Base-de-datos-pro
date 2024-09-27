const TABLA = "Aut";
const bcrypt = require("bcrypt");
const auth = require("../../autenticacion");

module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (db) {
    db = require("../../DB/mysql");
  }

  async function login(usuario, password) {
    const results = await db.query(TABLA, { usuario });
    if (!results.length) {
      throw new Error("Usuario y/o contraseña incorrecta.");
    }

    const user = results[0];
    console.log("user: ", user);

    return bcrypt.compare(password, user.password).then((resultado) => {
      if (resultado == true) {
        //generar un token
        return auth.asignarToken({ ...user });
      } else {
        throw new Error("Informacion invalida");
      }
    });
  }

  async function agregar(data) {
    const authData = {
      id: data.id,
    };

    if (data.usuario) {
      authData.usuario = data.usuario;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }

    return db.agregar(TABLA, authData);
  }

  return { agregar, login };
};
