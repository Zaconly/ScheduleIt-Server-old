import { Board } from "../../database/models"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { ServerError } from "../errors"
import { logger } from "../../utils"

const boardResolver: Resolvers<Context> = {
  Query: {
    board: async (_parent, { id }): Promise<Maybe<Board>> => await Board.findByPk(id),
    userBoards: async (_parent, { userId }): Promise<Board[]> =>
      await Board.findAll({ where: { userId } }),
    allBoards: async (): Promise<Board[]> => await Board.findAll()
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
