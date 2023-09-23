const config = require('../env-config/index');

const  dbNames  = require('./models/index');

const postgresDatabaseConfig = dbNames;

const dbConfig = postgresDatabaseConfig.reduce((acc, databaseConfigName) => {
  acc[databaseConfigName] = config.get(databaseConfigName);
  return acc;
}, {});

module.exports = dbConfig;
