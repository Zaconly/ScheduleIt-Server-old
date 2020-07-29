import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date"
import userResolver from "./user"
import authResolver from "./auth"
import boardResolver from "./board"
import taskResolver from "./task"
import templateResolver from "./template"
import tagResolver from "./tag"

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
