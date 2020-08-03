import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"

import authResolver from "./auth"
import boardResolver from "./board"
import tagResolver from "./tag"
import taskResolver from "./task"
import templateResolver from "./template"
import userResolver from "./user"

const scalarResolver = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
}

export default [
  scalarResolver,
  userResolver,
  authResolver,
  templateResolver,
  boardResolver,
  taskResolver,
  tagResolver
]
