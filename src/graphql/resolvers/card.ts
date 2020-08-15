import { resolver } from "graphql-sequelize"

import { Card } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const cardResolver: Resolvers<Context> = {
  Card: {
    checkLists: resolver(Card.associations.checkLists),
    tags: resolver(Card.associations.tags)
  },
  Query: {
    card: resolver(Card),
    cards: resolver(Card),
    cardsTag: resolver(Card),
    cardsList: resolver(Card)
  },
  Mutation: {
    addCard: async (_parent, { listId, input }) => {
      try {
        const newCard = await Card.create({ listId, ...input })

        return newCard
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    attachTag: async (_parent, { cardId, tagId }) => {
      try {
        const card = await Card.findByPk(cardId)
        card?.$add("tasks", tagId)

        return card
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    detachTag: async (_parent, { cardId, tagId }) => {
      try {
        const card = await Card.findByPk(cardId)
        card?.$remove("tasks", tagId)

        return card
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateCard: async (_parent, { id, input }) => {
      try {
        await Card.update(input, { where: { id } })

        const updatedCard = await Card.findByPk(id)
        return updatedCard
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteCard: async (_parent, { id }) => {
      try {
        await Card.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default cardResolver
