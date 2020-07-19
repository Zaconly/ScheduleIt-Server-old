import { gql } from "apollo-server-express"

const templateSchema = gql`
  extend type Query {
    template(id: ID!): Template
    authorTemplates(authorId: ID!): [Template!]
    allTemplates: [Template!]
  }

  extend type Mutation {
    addTemplate(input: TemplateInput!): Template
    updateTemplate(id: ID!, input: TemplateInput!): Template
    deleteTemplate(id: ID!): Boolean
  }

  input TemplateInput {
    name: String!
  }

  type Template {
    id: ID!
    name: String!
    author: User
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default templateSchema
