import { gql } from "apollo-server-express"
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
`

export default [linkSchema, userSchema]
