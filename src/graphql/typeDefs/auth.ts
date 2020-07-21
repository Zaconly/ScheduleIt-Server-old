import { gql } from "apollo-server-express"

const authSchema = gql`
  extend type Query {
    me: AuthPayload!
  }

  extend type Mutation {
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, email: String!, newPassword: String!): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
  }

  type AuthPayload {
    me: User!
    token: String!
    expiryDate: DateTime!
    refreshToken: String!
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
