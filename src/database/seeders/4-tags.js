const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}

const generateTags = boardsId => {
  return [...Array(80)].map(() => ({
    id: shortid.generate(),
    name: faker.random.words(),
    color: faker.internet.color(),
    boardId: boardsId[Math.floor(Math.random() * boardsId.length)],
    ...baseProps
  }))
}

module.exports = {
  up: async queryInterface => {
    const fetchedBoardsId = await queryInterface.sequelize.query("SELECT id FROM Boards")
    const tags = generateTags(fetchedBoardsId[0].map(i => i.id))

    return queryInterface.bulkInsert("Tags", tags, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Tags", null, {})
  }
}
