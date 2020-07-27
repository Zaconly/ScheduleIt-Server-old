import { shield, rule, not, or, chain } from "graphql-shield"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema, ApolloError, ForbiddenError } from "apollo-server-express"
import typeDefs from "../typeDefs"
import resolvers from "../resolvers"
import { Board, Task, Template } from "../../database/models"

const AuthenticatedError = new ApolloError("You must be logout to do this action", "AUTHENTICATED")

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

const permissions = shield(
  {
    Query: {
      me: isAuth,
      board: chain(isAuth, or(isAdmin, isBoardOwner)),
      userBoards: chain(isAuth, isAdmin),
      allBoards: chain(isAuth, isAdmin),
      task: chain(isAuth, or(isAdmin, isTaskOwner)),
      boardTasks: chain(isAuth, or(isAdmin, isBoardOwner)),
      userTasks: isAuth,
      template: isAuth,
      authorTemplates: isAuth,
      allTemplates: isAuth,
      user: chain(isAuth, isAdmin),
      allUsers: chain(isAuth, isAdmin)
    },
    Mutation: {
      login: not(isAuth, AuthenticatedError),
      register: not(isAuth, AuthenticatedError),
      forgotPassword: not(isAuth, AuthenticatedError),
      resetPassword: not(isAuth, AuthenticatedError),
      changePassword: isAuth,
      addBoard: isAuth,
      updateBoard: chain(isAuth, or(isAdmin, isBoardOwner)),
      deleteBoard: chain(isAuth, or(isAdmin, isBoardOwner)),
      addTask: isAuth,
      updateTask: chain(isAuth, or(isAdmin, isTaskOwner)),
      deleteTask: chain(isAuth, or(isAdmin, isTaskOwner)),
      addTemplate: isAuth,
      updateTemplate: chain(isAuth, or(isAdmin, isTemplateOwner)),
      deleteTemplate: chain(isAuth, or(isAdmin, isTemplateOwner)),
      addUser: chain(isAuth, isAdmin),
      updateUser: chain(isAuth, isAdmin),
      deleteUser: chain(isAuth, isAdmin)
    },
    Board: isAuth,
    Task: isAuth,
    Template: isAuth
  },
  {
    fallbackError: errThrown => {
      if (errThrown instanceof ApolloError) {
        return errThrown
      } else if (errThrown instanceof Error) {
        return new ForbiddenError("You are not authorized to access this resource")
      } else {
        return new ForbiddenError("You are not authorized to access this resource")
      }
    }
  }
)

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
)

export default schema
