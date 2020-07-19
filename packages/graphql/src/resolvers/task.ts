import { Task, Board } from "@monorepo/database"
import { Resolvers, Maybe } from "../types"

const TaskResolver: Resolvers = {
  Query: {
    task: async (_parent, { id }): Promise<Maybe<Task>> => await Task.findByPk(id),
    boardTasks: async (_parent, { boardId }): Promise<Task[]> => {
      const tasks = await Task.findAll({ where: { boardId } })
      console.info(tasks)
      return tasks
    },
    userTasks: async (_parent, { userId }): Promise<Task[]> =>
      await Task.findAll({
        include: [
          {
            model: Board as never,
            where: { userId }
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
        return false
      }
    }
  }
}

export default TaskResolver
