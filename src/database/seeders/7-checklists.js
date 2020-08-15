const faker = require("faker")
const shortid = require("shortid")

const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}
const currOrderByCard = {}

const generateCheckLists = cardsId => {
  return [...Array(250)].map(() => {
    const randCardId = Math.floor(Math.random() * cardsId.length)
    const order = currOrderByCard[randCardId]
      ? (currOrderByCard[randCardId] += 1)
      : (currOrderByCard[randCardId] = 1)

    return {
      id: shortid.generate(),
      name: faker.random.words(),
      cardId: cardsId[randCardId],
      order,
      ...baseProps
    }
  })
}

module.exports = {
  up: async queryInterface => {
    const fetchedCardsId = await queryInterface.sequelize.query("SELECT id FROM Cards")
    const checkLists = generateCheckLists(fetchedCardsId[0].map(i => i.id))

    return queryInterface.bulkInsert("CheckLists", checkLists, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("CheckLists", null, {})
  }
}
