import { gql } from "apollo-server-express"

const cardSchema = gql`
  extend type Query {
    card(id: ID!): Card
    cards: [Card!]
    cardsTag(tagId: ID!): [Card!]
    cardsList(listId: ID!): [Card!]
  }

  extend type Mutation {
    addCard(listId: ID!, input: CardInput!): Card
    attachTag(cardId: ID!, tagId: ID!): Card
    detachTag(cardId: ID!, tagId: ID!): Card
    updateCard(id: ID!, input: CardInput!): Card
    deleteCard(id: ID!): Void
  }

  input CardInput {
    name: String
    dueDate: DateTime
    desc: String
    order: Int
  }

  type Card {
    id: ID!
    name: String!
    dueDate: DateTime
    desc: String
    order: Int!
    checkLists: [CheckList!]
    tags: [Tag!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default cardSchema
