import { Board } from "../../database"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { ServerError } from "../errors"
import { logger } from "../../utils"
import { resolver } from "graphql-sequelize"

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
    addBoard: async (_parent, { input }): Promise<Maybe<Board>> => {
      const newBoard = await Board.create(input)

      return newBoard
    },
    updateBoard: async (_parent, { id, input }): Promise<Maybe<Board>> => {
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
