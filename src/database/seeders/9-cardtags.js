const shortid = require("shortid")

const tagsCard = []

const generateTagsForCard = (cardsId, tagsId) => {
  tagsCard.push(
    ...[...Array(50)].map(() => ({
      id: shortid.generate(),
      cardId: cardsId[Math.floor(Math.random() * cardsId.length)],
      tagId: tagsId[Math.floor(Math.random() * tagsId.length)]
    }))
  )
}

module.exports = {
  up: async queryInterface => {
    const fetchedCardsId = await queryInterface.sequelize.query("SELECT id FROM Cards")
    const fetchedTagsId = await queryInterface.sequelize.query("SELECT id FROM Tags")
    generateTagsForCard(
      fetchedCardsId[0].map(i => i.id),
      fetchedTagsId[0].map(i => i.id)
    )

    return queryInterface.bulkInsert("CardTags", tagsCard, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("CardTags", null, {})
  }
}
