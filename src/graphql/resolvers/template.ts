import { resolver } from "graphql-sequelize"

import { Template } from "../../database"
import { logger } from "../../utils"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const templateResolver: Resolvers<Context> = {
  Query: {
    template: resolver(Template),
    authorTemplates: resolver(Template),
    allTemplates: resolver(Template)
  },
  Mutation: {
    addTemplate: async (_parent, { input }) => {
      const newTemplate = await Template.create(input)

      return newTemplate
    },
    updateTemplate: async (_parent, { id, input }) => {
      await Template.update(input, { where: { id } })

      const updatedTemplate = await Template.findByPk(id)
      return updatedTemplate
    },
    deleteTemplate: async (_parent, { id }) => {
      try {
        await Template.destroy({ where: { id } })

        return true
      } catch (e) {
        logger(e, "ERROR")
        throw new ServerError()
      }
    }
  }
}

export default templateResolver
