import { gql } from "apollo-server-express"

const tagSchema = gql`
  extend type Query {
    tag(id: ID!): Tag
    taskTags(taskId: ID!): [Tag!]
    tagTasks(id: ID!): [Task!]
  }

  type Tag {
    id: ID!
    name: String!
    color: String
  }
`

export default tagSchema
