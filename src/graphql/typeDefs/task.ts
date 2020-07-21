import { gql } from "apollo-server-express"

const taskSchema = gql`
  extend type Query {
    task(id: ID!): Task
    boardTasks(boardId: ID!): [Task!]
    userTasks(userId: ID): [Task!]
  }

  extend type Mutation {
    addTask(boardId: ID!, input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Boolean
  }

  input TaskInput {
    name: String!
    isCompleted: Boolean!
    startDate: DateTime
    endDate: DateTime
  }

  type Task {
    id: ID!
    name: String!
    isCompleted: Boolean!
    startDate: DateTime
    endDate: DateTime
    board: Board
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default taskSchema
