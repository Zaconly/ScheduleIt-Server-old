import { gql } from "apollo-server-express"

const authSchema = gql`
  extend type Query {
    me: User!
  }

  extend type Mutation {
    login(input: LoginInput!): User!
    register(input: RegisterInput!): User!
    logout: Void
    forgotPassword(email: String!): Void
    resetPassword(token: String!, newPassword: String!): Void
    changePassword(oldPassword: String!, newPassword: String!): Void
  }

  input LoginInput {
    identifier: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
`

export default authSchema
