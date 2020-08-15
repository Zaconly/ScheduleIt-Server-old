import { gql } from "apollo-server-express"

const templateSchema = gql`
  extend type Query {
    template(id: ID!): Template
    templates: [Template!]
    templatesAuthor(authorId: ID!): [Template!]
  }

  extend type Mutation {
    addTemplate(input: TemplateInput!): Template
    updateTemplate(id: ID!, input: TemplateInput!): Template
    deleteTemplate(id: ID!): Void
  }

  input TemplateInput {
    name: String!
  }

  type Template {
    id: ID!
    name: String!
    desc: String
    type: String!
    author: User
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default templateSchema
