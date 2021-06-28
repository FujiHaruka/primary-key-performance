const { Sequelize, Model, DataTypes } = require('sequelize');

function models(sequelize) {
  class Account extends Model {}
  Account.init({
    key: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
  }, { sequelize, modelName: 'account' })
  
  class User extends Model {}
  User.init({
    key: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    accountKey: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
        key: 'key',
      }
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  }, { sequelize, modelName: 'user' });
  
  Account.hasMany(User);
  User.belongsTo(Account);

  return {
    Account,
    User,
  }
}

module.exports = models
