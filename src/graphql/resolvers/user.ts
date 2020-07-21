import { User } from "../../database/models"
import { Resolvers, Maybe } from "../types"
import { Context } from "../context"

const userResolver: Resolvers<Context> = {
  Query: {
    user: async (_parent, { id }): Promise<Maybe<User>> => await User.findByPk(id),
    allUsers: async (): Promise<User[]> => await User.findAll()
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
        return false
      }
    }
  }
}

export default userResolver
