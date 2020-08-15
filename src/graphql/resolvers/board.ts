import { resolver } from "graphql-sequelize"

import { Board } from "../../database"
import { logger } from "../../utils/log/logger"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const boardResolver: Resolvers<Context> = {
  Board: {
    tasks: resolver(Board.associations.tasks),
    lists: resolver(Board.associations.lists)
  },
  Query: {
    board: resolver(Board),
    boards: resolver(Board),
    boardsUser: resolver(Board),
    boardsMe: resolver(Board, {
      before: (options, _args, { me }) => {
        options.where = { userId: me.id }
        return options
      }
    })
  },
  Mutation: {
    addBoard: async (_parent, { input }) => {
      try {
        const newBoard = await Board.create(input)

        return newBoard
      } catch (e) {
        logger.error(JSON.stringify(e))
        throw new ServerError(e.message)
      }
    },
    updateBoard: async (_parent, { id, input }) => {
      try {
        await Board.update(input, { where: { id } })

        const updatedBoard = await Board.findByPk(id)
        return updatedBoard
      } catch (e) {
        logger.error(JSON.stringify(e))
        throw new ServerError(e.message)
      }
    },
    deleteBoard: async (_parent, { id }) => {
      try {
        await Board.destroy({ where: { id } })
      } catch (e) {
        logger.error(JSON.stringify(e))
        throw new ServerError(e.message)
      }
    }
  }
}

export default boardResolver
