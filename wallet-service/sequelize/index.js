const config = require("../env-config/index");
const dbConfig = config.get('wallet-db');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
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

db.wallet = require("./models/wallet")(sequelize, Sequelize);
db.walletTransactions = require("./models/wallet-transactions")(sequelize, Sequelize);

module.exports = db;
