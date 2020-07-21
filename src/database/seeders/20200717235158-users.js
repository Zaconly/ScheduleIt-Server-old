const faker = require("faker")
const shortid = require("shortid")
const bcrypt = require("bcryptjs")

const users = []
const baseProps = {
  password: bcrypt.hashSync("root", 10),
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
    role: "ADMIN",
    ...baseProps
  },
  {
    id: shortid.generate(),
    username: "Zaconly",
    email: "thomas.vaucois@viacesi.fr",
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
