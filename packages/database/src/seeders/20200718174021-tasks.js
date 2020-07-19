const faker = require("faker")
const shortid = require("shortid")

const tasks = []
const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}

const generateTasks = boardsId => {
  tasks.push(
    ...[...Array(100)].map(() => ({
      id: shortid.generate(),
      name: faker.random.words(),
      isCompleted: faker.random.boolean(),
      boardId: boardsId[Math.floor(Math.random() * boardsId.length)],
      ...baseProps
    }))
  )
}

module.exports = {
  up: async queryInterface => {
    const fetchedBoardsId = await queryInterface.sequelize.query("SELECT id FROM Boards")
    generateTasks(fetchedBoardsId[0].map(i => i.id))

    return queryInterface.bulkInsert("Tasks", tasks, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Tasks", null, {})
  }
}
