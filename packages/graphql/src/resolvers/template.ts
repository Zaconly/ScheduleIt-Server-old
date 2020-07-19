import { Template } from "@monorepo/database"
import { Resolvers, Maybe } from "../types"

const templateResolver: Resolvers = {
  Query: {
    template: async (_parent, { id }): Promise<Maybe<Template>> => await Template.findByPk(id),
    authorTemplates: async (_parent, { authorId }): Promise<Template[]> =>
      await Template.findAll({ where: { authorId } }),
    allTemplates: async (): Promise<Template[]> => await Template.findAll()
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
        return false
      }
    }
  }
}

export default templateResolver
