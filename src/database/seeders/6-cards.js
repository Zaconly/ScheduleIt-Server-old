const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}
const currOrderByList = {}

const generateCards = listsId => {
  return [...Array(100)].map(() => {
    const randListId = Math.floor(Math.random() * listsId.length)
    const order = currOrderByList[randListId]
      ? (currOrderByList[randListId] += 1)
      : (currOrderByList[randListId] = 1)

    return {
      id: shortid.generate(),
      name: faker.random.words(),
      listId: listsId[randListId],
      dueDate: faker.random.boolean() ? faker.date.recent() : faker.date.recent(-1),
      desc: faker.hacker.phrase(),
      order,
      ...baseProps
    }
  })
}

module.exports = {
  up: async queryInterface => {
    const fetchedListsId = await queryInterface.sequelize.query("SELECT id FROM Lists")
    const cards = generateCards(fetchedListsId[0].map(i => i.id))

    return queryInterface.bulkInsert("Cards", cards, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Cards", null, {})
  }
}
