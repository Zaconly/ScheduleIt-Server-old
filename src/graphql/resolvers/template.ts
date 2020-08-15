import { resolver } from "graphql-sequelize"

import { Template } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const templateResolver: Resolvers<Context> = {
  Query: {
    template: resolver(Template),
    templates: resolver(Template),
    templatesAuthor: resolver(Template)
  },
  Mutation: {
    addTemplate: async (_parent, { input }) => {
      try {
        const newTemplate = await Template.create(input)

        return newTemplate
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateTemplate: async (_parent, { id, input }) => {
      try {
        await Template.update(input, { where: { id } })

        const updatedTemplate = await Template.findByPk(id)
        return updatedTemplate
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteTemplate: async (_parent, { id }) => {
      try {
        await Template.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default templateResolver
