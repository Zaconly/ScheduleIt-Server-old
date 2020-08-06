import { gql } from "apollo-server-express"

import authSchema from "./auth"
import boardSchema from "./board"
import tagSchema from "./tag"
import taskSchema from "./task"
import templateSchema from "./template"
import userSchema from "./user"

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
  scalar Void
`

export default [
  linkSchema,
  userSchema,
  authSchema,
  templateSchema,
  boardSchema,
  taskSchema,
  tagSchema
]
