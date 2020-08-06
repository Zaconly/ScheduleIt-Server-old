import { resolver } from "graphql-sequelize"

import { User } from "../../database"
import { logger } from "../../utils"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const userResolver: Resolvers<Context> = {
  User: {
    boards: resolver(User.associations.boards)
  },
  Query: {
    user: resolver(User),
    allUsers: resolver(User)
  },
  Mutation: {
    addUser: async (_parent, { input }) => {
      const newUser = await User.create(input)

      return newUser
    },
    updateUser: async (_parent, { id, input }) => {
      if (input.username) {
        await User.update({ username: input.username }, { where: { id } })
      }

      const updatedUser = await User.findByPk(id)
      return updatedUser
    },
    deleteUser: async (_parent, { id }) => {
      try {
        await User.destroy({ where: { id } })

        return true
      } catch (e) {
        logger(e, "ERROR")
        throw new ServerError()
      }
    }
  }
}

export default userResolver
