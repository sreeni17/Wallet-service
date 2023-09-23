const config = require('../../env-config/index');
const dbConfig = config.get('wallet-db')
module.exports = {  
  development: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: 'postgres',
    pool: dbConfig.pool,
  },
};  