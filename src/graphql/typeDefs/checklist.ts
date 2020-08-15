import { gql } from "apollo-server-express"

const checkListSchema = gql`
  extend type Query {
    checkList(id: ID!): CheckList
    checkLists: [CheckList!]
    checkListsCard(cardId: ID!): [CheckList!]
  }

  extend type Mutation {
    addCheckList(cardId: ID!, input: CheckListInput!): CheckList
    updateCheckList(id: ID!, input: CheckListInput!): CheckList
    deleteCheckList(id: ID!): Void
  }

  input CheckListInput {
    name: String
    order: Int
  }

  type CheckList {
    id: ID!
    name: String!
    order: Int!
    tasks: [Task!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default checkListSchema
