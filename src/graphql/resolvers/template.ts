import { Template } from "../../database"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { ServerError } from "../errors"
import { logger } from "../../utils"
import { resolver } from "graphql-sequelize"

const templateResolver: Resolvers<Context> = {
  Query: {
    template: resolver(Template),
    authorTemplates: resolver(Template),
    allTemplates: resolver(Template)
  },
  Mutation: {
    addTemplate: async (_parent, { input }): Promise<Maybe<Template>> => {
      const newTemplate = await Template.create(input)

      return newTemplate
    },
    updateTemplate: async (_parent, { id, input }): Promise<Maybe<Template>> => {
      await Template.update(input, { where: { id } })

      const updatedTemplate = await Template.findByPk(id)
      return updatedTemplate
    },
    deleteTemplate: async (_parent, { id }): Promise<boolean> => {
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
