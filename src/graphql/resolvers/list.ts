import { resolver } from "graphql-sequelize"

import { List } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const listResolver: Resolvers<Context> = {
  List: {
    cards: resolver(List.associations.cards)
  },
  Query: {
    list: resolver(List),
    lists: resolver(List),
    listsBoard: resolver(List)
  },
  Mutation: {
    addList: async (_parent, { boardId, input }) => {
      try {
        const newList = await List.create({ boardId, ...input })

        return newList
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateList: async (_parent, { id, input }) => {
      try {
        await List.update(input, { where: { id } })

        const updatedList = await List.findByPk(id)
        return updatedList
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteList: async (_parent, { id }) => {
      try {
        await List.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default listResolver
