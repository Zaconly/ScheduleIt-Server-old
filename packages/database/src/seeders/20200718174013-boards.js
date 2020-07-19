const faker = require("faker")
const shortid = require("shortid")

const boards = []
const baseProps = {
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

const generateBoards = usersId => {
  boards.push(
    ...[...Array(20)].map(() => ({
      id: shortid.generate(),
      name: faker.random.words(),
      userId: usersId[Math.floor(Math.random() * usersId.length)],
      ...baseProps
    }))
  )
}

module.exports = {
  up: async queryInterface => {
    const fetchedUsersId = await queryInterface.sequelize.query("SELECT id FROM Users")
    generateBoards(fetchedUsersId[0].map(i => i.id))

    return queryInterface.bulkInsert("Boards", boards, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Boards", null, {})
  }
}
