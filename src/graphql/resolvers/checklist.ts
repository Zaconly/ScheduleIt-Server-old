import { resolver } from "graphql-sequelize"

import { CheckList } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const checkListResolver: Resolvers<Context> = {
  CheckList: {
    tasks: resolver(CheckList.associations.tasks)
  },
  Query: {
    checkList: resolver(CheckList),
    checkLists: resolver(CheckList),
    checkListsCard: resolver(CheckList)
  },
  Mutation: {
    addCheckList: async (_parent, { cardId, input }) => {
      try {
        const newChecklist = await CheckList.create({ cardId, ...input })

        return newChecklist
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateCheckList: async (_parent, { id, input }) => {
      try {
        await CheckList.update(input, { where: { id } })

        const updatedChecklist = await CheckList.findByPk(id)
        return updatedChecklist
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteCheckList: async (_parent, { id }) => {
      try {
        await CheckList.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default checkListResolver
