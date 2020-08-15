const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}
const currOrderByBoard = {}

const generateLists = boardsId => {
  return [...Array(50)].map(() => {
    const randBoardId = Math.floor(Math.random() * boardsId.length)
    const order = currOrderByBoard[randBoardId]
      ? (currOrderByBoard[randBoardId] += 1)
      : (currOrderByBoard[randBoardId] = 1)

    return {
      id: shortid.generate(),
      name: faker.random.words(),
      boardId: boardsId[randBoardId],
      order,
      ...baseProps
    }
  })
}

module.exports = {
  up: async queryInterface => {
    const fetchedBoardsId = await queryInterface.sequelize.query("SELECT id FROM Boards")
    const lists = generateLists(fetchedBoardsId[0].map(i => i.id))

    return queryInterface.bulkInsert("Lists", lists, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Lists", null, {})
  }
}
