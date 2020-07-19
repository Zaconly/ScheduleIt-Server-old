import { gql } from "apollo-server-express"

const boardSchema = gql`
  extend type Query {
    board(id: ID!): Board
    userBoards(id: ID!): [Board!]
    allBoards: [Board!]
  }

  extend type Mutation {
    addBoard(input: BoardInput!): Board
    updateBoard(id: ID!, input: BoardInput!): Board
    deleteBoard(id: ID!): Boolean
  }

  input BoardInput {
    name: String!
    icon: String!
    isArchived: Boolean!
  }

  type Board {
    id: ID!
    name: String!
    icon: String
    template: Template
    isArchived: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default boardSchema
