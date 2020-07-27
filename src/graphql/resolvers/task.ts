import { Task } from "../../database"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { ServerError } from "../errors"
import { logger } from "../../utils"
import { resolver } from "graphql-sequelize"

const TaskResolver: Resolvers<Context> = {
  Query: {
    task: resolver(Task),
    boardTasks: resolver(Task),
    userTasks: resolver(Task)
  },
  Mutation: {
    addTask: async (_parent, { boardId, input }): Promise<Maybe<Task>> => {
      const newTask = await Task.create({
        boardId,
        ...input
      })

      return newTask
    },
    updateTask: async (_parent, { id, input }): Promise<Maybe<Task>> => {
      await Task.update(input, { where: { id } })

      const updatedTask = await Task.findByPk(id)
      return updatedTask
    },
    deleteTask: async (_parent, { id }): Promise<boolean> => {
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

export default TaskResolver
