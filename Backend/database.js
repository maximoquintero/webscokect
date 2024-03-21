const { json } = require("express");

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "mysql-maxquin.alwaysdata.net",
  user: "maxquin",
  password: "HolaMundo23",
  database: "maxquin_sm52_arduinio",
});

connection.connect(function (error) {
  if (error) {
    console.log("Error al conectar la bd");
  } else {
    console.log("conexion realizada exitosamente");
  }
});

module.exports = connection;
