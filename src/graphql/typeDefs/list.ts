import { gql } from "apollo-server-express"

const listSchema = gql`
  extend type Query {
    list(id: ID!): List
    lists: [List!]
    listsBoard(boardId: ID!): [List!]
  }

  extend type Mutation {
    addList(boardId: ID!, input: ListInput!): List
    updateList(id: ID!, input: ListInput!): List
    deleteList(id: ID!): Void
  }

  input ListInput {
    name: String
    order: Int
  }

  type List {
    id: ID!
    name: String!
    order: Int!
    cards: [Card!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default listSchema
