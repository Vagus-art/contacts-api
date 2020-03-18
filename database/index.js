const { Pool } = require('pg');
require("dotenv").config();

//CONEXION A POSTGRESQL POR VARIABLES DE ENTORNO
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//EXPORTO SOLO LA FUNCION QUERY
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
      }
}