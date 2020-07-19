import { gql } from "apollo-server-express"

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
    allUsers: [User!]
  }

  extend type Mutation {
    addUser(input: UserInput!): User
    updateUser(id: ID!, input: UpdateInput!): User
    deleteUser(id: ID!): Boolean
  }

  enum Role {
    USER
    ADMIN
  }

  input UpdateInput {
    username: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    isActive: Boolean!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default userSchema
