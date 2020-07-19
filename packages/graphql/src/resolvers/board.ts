import { Board } from "@monorepo/database"
import { Resolvers, Maybe } from "../types"

const boardResolver: Resolvers = {
  Query: {
    board: async (_parent, { id }): Promise<Maybe<Board>> => await Board.findByPk(id),
    userBoards: async (_parent, { id }): Promise<Board[]> => await Board.findAll({ where: { id } }),
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
        return false
      }
    }
  }
}

export default boardResolver
