// first import the db config & sequelize
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// init sequelize with db config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.tutos = require("./tuto.model.js")(sequelize, Sequelize);

// export the model db to make it available in our app
module.exports = db;