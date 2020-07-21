import { shield, rule, not, or, and } from "graphql-shield"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema } from "apollo-server-express"
import typeDefs from "../typeDefs"
import resolvers from "../resolvers"
import { Board, Task, Template } from "../../database/models"

const isAuth = rule({ cache: "contextual" })(async (_parent, _args, { me }) => !!me)

const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { me }) => me.role === "ADMIN")

const isBoardOwner = rule()(async (_parent, args, { me }) => {
  const board = await Board.findOne({ where: { id: args.id || args.boardId, userId: me.id } })
  return !!board
})

const isTaskOwner = rule()(async (_parent, { id }, { me }) => {
  const task = await Task.findOne({
    where: { id },
    include: [
      {
        model: Board as never,
        where: { userId: me.id }
      }
    ]
  })
  return !!task
})

const isTemplateOwner = rule()(async (_parent, { id }, { me }) => {
  const template = await Template.findOne({ where: { id, authorId: me.id } })
  return !!template
})

const permissions = shield({
  Query: {
    me: isAuth,
    board: and(isAuth, or(isAdmin, isBoardOwner)),
    userBoards: and(isAuth, isAdmin),
    allBoards: and(isAuth, isAdmin),
    task: and(isAuth, or(isAdmin, isTaskOwner)),
    boardTasks: and(isAuth, or(isAdmin, isBoardOwner)),
    userTasks: isAuth,
    template: isAuth,
    authorTemplates: isAuth,
    allTemplates: isAuth,
    user: and(isAuth, isAdmin),
    allUsers: and(isAuth, isAdmin)
  },
  Mutation: {
    login: not(isAuth),
    register: not(isAuth),
    forgotPassword: not(isAuth),
    resetPassword: not(isAuth),
    changePassword: isAuth,
    addBoard: isAuth,
    updateBoard: and(isAuth, or(isAdmin, isBoardOwner)),
    deleteBoard: and(isAuth, or(isAdmin, isBoardOwner)),
    addTask: isAuth,
    updateTask: and(isAuth, or(isAdmin, isTaskOwner)),
    deleteTask: and(isAuth, or(isAdmin, isTaskOwner)),
    addTemplate: isAuth,
    updateTemplate: and(isAuth, or(isAdmin, isTemplateOwner)),
    deleteTemplate: and(isAuth, or(isAdmin, isTemplateOwner)),
    addUser: and(isAuth, isAdmin),
    updateUser: and(isAuth, isAdmin),
    deleteUser: and(isAuth, isAdmin)
  },
  Me: isAuth,
  Board: isAuth,
  Task: isAuth,
  Template: isAuth,
  User: isAuth
})

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
)

export default schema
