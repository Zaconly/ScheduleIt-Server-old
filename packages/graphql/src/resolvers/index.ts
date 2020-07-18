import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date"
import userResolver from "./user"

const scalarResolver = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
}

export default [scalarResolver, userResolver]
