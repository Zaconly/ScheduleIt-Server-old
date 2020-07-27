import { gql } from "apollo-server-express"

const boardSchema = gql`
  extend type Query {
    board(id: ID!): Board
    userBoards(userId: ID): [Board!]
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
    template: Template
    tasks: [Task!]
    icon: String
    isArchived: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default boardSchema
