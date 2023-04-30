const Sequelize = require("sequelize");
const pkg = require("../../package.json");

// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const databaseName =
  "bloom_server" + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: console.log,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   config
// );
const db = new Sequelize("postgres", "postgres", "postgres", {
  // host: "database-1-instance-1.co1ctmnxl6ev.us-east-2.rds.amazonaws.com",
  host: "database-1.co1ctmnxl6ev.us-east-2.rds.amazonaws.com",
  dialect: "postgres",
  port: 5432, // or your custom port
  ssl: true, // if you have configured SSL/TLS for your RDS instance
});

module.exports = db;
