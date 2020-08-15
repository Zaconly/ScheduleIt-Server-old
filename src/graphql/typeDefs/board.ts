import { gql } from "apollo-server-express"

const boardSchema = gql`
  extend type Query {
    board(id: ID!): Board
    boards: [Board!]
    boardsMe: [Board!]
    boardsUser(userId: ID): [Board!]
  }

  extend type Mutation {
    addBoard(input: BoardInput!): Board
    updateBoard(id: ID!, input: BoardInput!): Board
    deleteBoard(id: ID!): Void
  }

  input BoardInput {
    name: String
    icon: String
    isArchived: Boolean
    order: Int
  }

  type Board {
    id: ID!
    name: String!
    template: Template
    tasks: [Task!]
    lists: [List!]
    icon: String
    isArchived: Boolean!
    order: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default boardSchema
