import { User } from "../../database"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"
import { logger } from "../../utils"
import { ServerError } from "../errors"
import { resolver } from "graphql-sequelize"

const userResolver: Resolvers<Context> = {
  User: {
    boards: resolver(User.associations.boards)
  },
  Query: {
    user: resolver(User),
    allUsers: resolver(User)
  },
  Mutation: {
    addUser: async (_parent, { input }): Promise<Maybe<User>> => {
      const newUser = await User.create(input)

      return newUser
    },
    updateUser: async (_parent, { id, input }): Promise<Maybe<User>> => {
      if (input.username) {
        await User.update({ username: input.username }, { where: { id } })
      }

      const updatedUser = await User.findByPk(id)
      return updatedUser
    },
    deleteUser: async (_parent, { id }): Promise<boolean> => {
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
