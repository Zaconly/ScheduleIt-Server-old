import { resolver } from "graphql-sequelize"

import { Tag } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const tagResolver: Resolvers<Context> = {
  Query: {
    tag: resolver(Tag),
    tags: resolver(Tag),
    tagsCard: resolver(Tag),
    tagsBoard: resolver(Tag)
  },
  Mutation: {
    addTag: async (_parent, { boardId, input }) => {
      try {
        const newTag = await Tag.create({ boardId, ...input })

        return newTag
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateTag: async (_parent, { id, input }) => {
      try {
        await Tag.update(input, { where: { id } })

        const updatedTag = await Tag.findByPk(id)
        return updatedTag
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteTag: async (_parent, { id }) => {
      try {
        await Tag.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default tagResolver
