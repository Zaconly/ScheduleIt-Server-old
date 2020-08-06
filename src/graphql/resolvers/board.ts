import { resolver } from "graphql-sequelize"

import { Board } from "../../database"
import { logger } from "../../utils"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const boardResolver: Resolvers<Context> = {
  Board: {
    tasks: resolver(Board.associations.tasks)
  },
  Query: {
    board: resolver(Board),
    userBoards: resolver(Board),
    allBoards: resolver(Board)
  },
  Mutation: {
    addBoard: async (_parent, { input }) => {
      const newBoard = await Board.create(input)

      return newBoard
    },
    updateBoard: async (_parent, { id, input }) => {
      await Board.update(input, { where: { id } })

      const updatedBoard = await Board.findByPk(id)
      return updatedBoard
    },
    deleteBoard: async (_parent, { id }): Promise<boolean> => {
      try {
        await Board.destroy({ where: { id } })

        return true
      } catch (e) {
        logger(e, "ERROR")
        throw new ServerError()
      }
    }
  }
}

export default boardResolver
