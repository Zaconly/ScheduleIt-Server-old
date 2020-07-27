import { gql } from "apollo-server-express"

const authSchema = gql`
  extend type Query {
    me: User!
  }

  extend type Mutation {
    login(input: LoginInput!): User!
    register(input: RegisterInput!): User!
    logout: Boolean!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, email: String!, newPassword: String!): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
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
