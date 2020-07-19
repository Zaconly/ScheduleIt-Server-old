import { gql } from "apollo-server-express"

const authSchema = gql`
  extend type Query {
    me: Me!
  }

  extend type Mutation {
    login(input: LoginInput!): Me!
    register(input: RegisterInput!): Me!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, email: String!, newPassword: String!): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
  }

  type Me {
    me: User!
    token: String!
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
