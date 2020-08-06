import { resolver } from "graphql-sequelize"

import { Task } from "../../database"
import { logger } from "../../utils"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const taskResolver: Resolvers<Context> = {
  Task: {
    tags: resolver(Task.associations.tags)
  },
  Query: {
    task: resolver(Task),
    boardTasks: resolver(Task),
    userTasks: resolver(Task)
  },
  Mutation: {
    addTask: async (_parent, { boardId, input }) => {
      const newTask = await Task.create({
        boardId,
        ...input
      })

      return newTask
    },
    updateTask: async (_parent, { id, input }) => {
      await Task.update(input, { where: { id } })

      const updatedTask = await Task.findByPk(id)
      return updatedTask
    },
    deleteTask: async (_parent, { id }) => {
      try {
        await Task.destroy({ where: { id } })

        return true
      } catch (e) {
        logger(e, "ERROR")
        throw new ServerError()
      }
    }
  }
}

export default taskResolver
