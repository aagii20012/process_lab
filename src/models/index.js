const dbConfig = require('../config/config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.pg.DB, dbConfig.pg.USER, dbConfig.pg.PASSWORD, {
  host: dbConfig.pg.HOST,
  dialect: dbConfig.pg.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pg.pool.max,
    min: dbConfig.pg.pool.min,
    acquire: dbConfig.pg.pool.acquire,
    idle: dbConfig.pg.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports.User = require('./user.model')(sequelize, Sequelize);
module.exports.Token = require('./token.model')(sequelize, Sequelize);
module.exports.Asset = require('./asset.model')(sequelize, Sequelize);
module.exports.ConstAsset = require('./constAsset.model')(sequelize, Sequelize);
module.exports.db = db;
