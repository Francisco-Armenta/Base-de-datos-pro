const mysql = require("mysql2");
const config = require("../config");
const { error } = require("../red/respuestas");

let connection = null;
function conMysql() {
  connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });
  connection.connect((err) => {
    if (err) {
      console.log("[db err]", err);
      setTimeout(conMysql, 2000);
    } else {
      console.log("DB Conectada!!!");
    }
  });
  connection.on("error", (err) => {
    console.log("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    } else {
      throw err;
    }
  });
}
conMysql();

function todos(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function agregar(tabla, data) {
  if (data && !data.id) {
    return insertar(tabla, data);
  } else {
    return actualizar(tabla, data);
  }
}

function insertar(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function actualizar(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${tabla} SET ? WHERE id = ?`,
      [data, data.id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE  FROM ${tabla} WHERE id = ?`,
      data.id,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
};
