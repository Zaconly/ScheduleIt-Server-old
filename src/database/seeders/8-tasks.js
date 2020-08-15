const faker = require("faker")
const shortid = require("shortid")

const tasks = []
const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}
const currOrderByParent = {}

const generateTasks = (boardsId, checkListsId) => {
  tasks.push(
    ...[...Array(500)].map(() => {
      const randBoolean = faker.random.boolean()
      const randParentId = randBoolean
        ? Math.floor(Math.random() * boardsId.length)
        : Math.floor(Math.random() * checkListsId.length)
      const order = currOrderByParent[randParentId]
        ? (currOrderByParent[randParentId] += 1)
        : (currOrderByParent[randParentId] = 1)

      return {
        id: shortid.generate(),
        name: faker.random.words(),
        isCompleted: faker.random.boolean(),
        order,
        boardId: randBoolean ? boardsId[randParentId] : null,
        checkListId: !randBoolean ? checkListsId[randParentId] : null,
        ...baseProps
      }
    })
  )
}

module.exports = {
  up: async queryInterface => {
    const fetchedBoardsId = await queryInterface.sequelize.query("SELECT id FROM Boards")
    const fetchedCheckListsId = await queryInterface.sequelize.query("SELECT id FROM CheckLists")
    generateTasks(
      fetchedBoardsId[0].map(i => i.id),
      fetchedCheckListsId[0].map(i => i.id)
    )

    return queryInterface.bulkInsert("Tasks", tasks, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Tasks", null, {})
  }
}
