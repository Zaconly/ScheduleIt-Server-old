import { gql } from "apollo-server-express"

import authSchema from "./auth"
import boardSchema from "./board"
import cardSchema from "./card"
import checkListSchema from "./checklist"
import listSchema from "./list"
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
  listSchema,
  cardSchema,
  checkListSchema,
  taskSchema,
  tagSchema
]
