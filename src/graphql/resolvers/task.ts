import { resolver } from "graphql-sequelize"

import { Task } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const taskResolver: Resolvers<Context> = {
  Query: {
    task: resolver(Task),
    tasks: resolver(Task),
    tasksCheckList: resolver(Task),
    tasksBoard: resolver(Task)
  },
  Mutation: {
    addTaskBoard: async (_parent, { boardId, input }) => {
      try {
        const newTask = await Task.create({ boardId, ...input })

        return newTask
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    addTaskCheckList: async (_parent, { checkListId, input }) => {
      try {
        const newTask = await Task.create({ checkListId, ...input })

        return newTask
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateTask: async (_parent, { id, input }) => {
      try {
        await Task.update(input, { where: { id } })

        const updatedTask = await Task.findByPk(id)
        return updatedTask
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteTask: async (_parent, { id }) => {
      try {
        await Task.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default taskResolver
