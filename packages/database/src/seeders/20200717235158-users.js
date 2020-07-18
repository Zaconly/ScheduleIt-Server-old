const faker = require("faker")
const shortid = require("shortid")

const users = []
const baseProps = {
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

// Base users
users.push(
  {
    id: shortid.generate(),
    username: "ScheduleIt",
    email: "noreply@scheduleit.com",
    password: "root",
    role: "ADMIN",
    ...baseProps
  },
  {
    id: shortid.generate(),
    username: "Zaconly",
    email: "thomas.vaucois@viacesi.fr",
    password: "root",
    role: "ADMIN",
    ...baseProps
  }
)

// Fake users
users.push(
  ...[...Array(8)].map(() => ({
    id: shortid.generate(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    role: "USER",
    ...baseProps
  }))
)

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Users", users, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Users", null, {})
  }
}
