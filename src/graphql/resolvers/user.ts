import User from "../../models/User"
import { Resolvers, Maybe } from "../types"

const userResolver: Resolvers = {
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
      if (input) await User.update(input, { where: { id } })

      const updatedUser = await User.findByPk(id)
      return updatedUser
    }
  }
}

export default userResolver
