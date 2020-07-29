const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}

const tags = [...Array(1000)].map(() => ({
  id: shortid.generate(),
  name: faker.random.words(),
  color: faker.internet.color(),
  ...baseProps
}))

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Tags", tags, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Tags", null, {})
  }
}
