const Pool = require('pg').Pool
require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: 'bloom'
})

module.exports = pool

const { Sequelize } = require("sequelize");
// const { Plant } = require("./db/models");

const sequelize = new Sequelize({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "bloom",
  dialect: 'postgres',
  define: {
    timestamps: false
}
});

// console.log("SQLIZE", sequelize)

module.exports = sequelize;
