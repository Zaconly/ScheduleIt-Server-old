import { gql } from "apollo-server-express"

const taskSchema = gql`
  extend type Query {
    task(id: ID!): Task
    tasks: [Task!]
    tasksCheckList: [Task!]
    tasksBoard: [Task!]
  }

  extend type Mutation {
    addTaskBoard(boardId: ID!, input: TaskInput!): Task
    addTaskCheckList(checkListId: ID!, input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Void
  }

  input TaskInput {
    name: String!
    isCompleted: Boolean!
    startDate: DateTime
    endDate: DateTime
    order: Int
  }

  type Task {
    id: ID!
    name: String!
    isCompleted: Boolean!
    startDate: DateTime
    endDate: DateTime
    order: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export default taskSchema
