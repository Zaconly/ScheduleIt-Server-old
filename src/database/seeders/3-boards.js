const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date()
}
const currOrderByUser = {}

const generateBoards = usersId => {
  return [...Array(20)].map(() => {
    const randUserId = Math.floor(Math.random() * usersId.length)
    const order = !!currOrderByUser[randUserId]
      ? (currOrderByUser[randUserId] += 1)
      : (currOrderByUser[randUserId] = 1)

    return {
      id: shortid.generate(),
      name: faker.random.words(),
      userId: usersId[randUserId],
      order,
      ...baseProps
    }
  })
}

module.exports = {
  up: async queryInterface => {
    const fetchedUsersId = await queryInterface.sequelize.query("SELECT id FROM Users")
    const boards = generateBoards(fetchedUsersId[0].map(i => i.id))

    return queryInterface.bulkInsert("Boards", boards, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Boards", null, {})
  }
}
