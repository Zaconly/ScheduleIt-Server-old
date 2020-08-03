import { resolver } from "graphql-sequelize"

import { Tag, Task } from "../../database"
import { Context } from "../context"
import { Resolvers } from "../types"

const tagResolver: Resolvers<Context> = {
  Query: {
    tag: resolver(Tag),
    taskTags: resolver(Tag, {
      before: (options, { taskId }) => {
        options.include = [
          {
            model: Task,
            where: { id: taskId }
          }
        ]
        return options
      }
    }),
    tagTasks: resolver(Tag)
  }
}

export default tagResolver
