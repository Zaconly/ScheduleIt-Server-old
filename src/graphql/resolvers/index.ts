import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"

import authResolver from "./auth"
import boardResolver from "./board"
import cardResolver from "./card"
import checkListResolver from "./checklist"
import listResolver from "./list"
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
  listResolver,
  cardResolver,
  checkListResolver,
  taskResolver,
  tagResolver
]
