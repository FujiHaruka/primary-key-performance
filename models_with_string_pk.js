const { Sequelize, Model, DataTypes } = require('sequelize');

function models(sequelize) {
  class Account extends Model {}
  Account.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
  }, { sequelize, modelName: 'account' })
  
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    accountId: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: 'id',
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
