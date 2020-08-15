import { gql } from "apollo-server-express"

const tagSchema = gql`
  extend type Query {
    tag(id: ID!): Tag
    tags: [Tag!]
    tagsCard(cardId: ID!): [Tag!]
    tagsBoard(boardId: ID!): [Tag!]
  }

  extend type Mutation {
    addTag(boardId: ID!, input: TagInput!): Tag
    updateTag(id: ID!, input: TagInput!): Tag
    deleteTag(id: ID!): Void
  }

  input TagInput {
    name: String
    color: String
  }

  type Tag {
    id: ID!
    name: String!
    color: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default tagSchema
