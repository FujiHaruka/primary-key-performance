
const { Sequelize } = require('sequelize');
const { performance } = require('perf_hooks')
const Models = require('./models_with_string_pk')

const sequelize = new Sequelize('primary_key_performance', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

(async () => {
  const models = Models(sequelize)
  await sequelize.sync({ force: true });

  const { Account, User } = models

  const USER_COUNT = 1000
  const ACCOUNT_COUNT = USER_COUNT / 100
  const BULK_SIZE = 100
  for (let i = 0; i < ACCOUNT_COUNT; i += BULK_SIZE) {
    await Account.bulkCreate(
      Array.from({ length: BULK_SIZE }).map((_, j) => ({
        name: `account-${i + j}`
      }))
    )
  }

  let userIds = []
  for (let i = 0; i < USER_COUNT; i += BULK_SIZE) {
    const users = await User.bulkCreate(
      Array.from({ length: BULK_SIZE }).map((_, j) => ({
        name: `user-${i + j}`,
        age: 10,
        accountKey: Math.floor(1 + (i + j) / 100)
      }))
    )
    userIds = userIds.concat(users.map(({id}) => id))
  }

  const QUERY_COUNT = 100
  const start = performance.now()
  for (let i = 1; i < QUERY_COUNT; i++) {
    await User.findByPk(userIds[i], { include: Account })
  }
  const end = performance.now()
  const duration = end - start
  console.log(`Users: ${USER_COUNT}`)
  console.log(`User.findByPK: ${QUERY_COUNT}`)
  console.log(`Tooks ${duration} ms`)
  await sequelize.close()
})();
