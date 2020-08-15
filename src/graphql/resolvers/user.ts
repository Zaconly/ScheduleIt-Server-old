import { resolver } from "graphql-sequelize"

import { User } from "../../database"
import { Context } from "../context"
import { ServerError } from "../errors"
import { Resolvers } from "../types"

const userResolver: Resolvers<Context> = {
  User: {
    boards: resolver(User.associations.boards)
  },
  Query: {
    user: resolver(User),
    users: resolver(User)
  },
  Mutation: {
    addUser: async (_parent, { input }) => {
      try {
        const newUser = await User.create(input)

        return newUser
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    updateUser: async (_parent, { id, input }) => {
      try {
        if (input.username) {
          await User.update({ username: input.username }, { where: { id } })
        }

        const updatedUser = await User.findByPk(id)
        return updatedUser
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    deleteUser: async (_parent, { id }) => {
      try {
        await User.destroy({ where: { id } })
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default userResolver
