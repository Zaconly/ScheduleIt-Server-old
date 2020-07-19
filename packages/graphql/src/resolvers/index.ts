import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date"
import userResolver from "./user"
import boardResolver from "./board"
import TaskResolver from "./task"
import templateResolver from "./template"

const scalarResolver = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
}

export default [scalarResolver, userResolver, templateResolver, boardResolver, TaskResolver]
