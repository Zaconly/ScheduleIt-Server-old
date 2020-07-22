import { Task, Board } from "../../database/models"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { ServerError } from "../errors"
import { logger } from "../../utils"

const TaskResolver: Resolvers<Context> = {
  Query: {
    task: async (_parent, { id }): Promise<Maybe<Task>> => await Task.findByPk(id),
    boardTasks: async (_parent, { boardId }): Promise<Task[]> =>
      await Task.findAll({ where: { boardId } }),
    userTasks: async (_parent, _args, { me }): Promise<Task[]> =>
      await Task.findAll({
        include: [
          {
            model: Board as never,
            where: { userId: me?.id }
          }
        ]
      })
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
