import { gql } from "apollo-server-express"
import userSchema from "./user"
import authSchema from "./auth"
import boardSchema from "./board"
import taskSchema from "./task"
import templateSchema from "./template"

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  scalar Date
  scalar Time
  scalar DateTime
`

export default [linkSchema, userSchema, authSchema, templateSchema, boardSchema, taskSchema]
