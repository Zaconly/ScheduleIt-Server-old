import { ApolloError, ForbiddenError, makeExecutableSchema } from "apollo-server-express"
import { applyMiddleware } from "graphql-middleware"
import { chain, not, race, rule, shield } from "graphql-shield"

import { Board, Tag, Task, Template } from "../../database"
import resolvers from "../resolvers"
import typeDefs from "../typeDefs"

const AuthenticatedError = new ApolloError("You must be logout to do this action", "AUTHENTICATED")

const isAuth = rule({ cache: "contextual" })(async (_parent, _args, { me }) => !!me)

const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { me }) => me.role === "ADMIN")

const isBoardOwner = rule()(async (_parent, args, { me }) => {
  const board = await Board.findOne({ where: { id: args.id || args.boardId, userId: me.id } })
  return !!board
})

const isTaskOwner = rule()(async (_parent, args, { me }) => {
  const task = await Task.findOne({
    where: { id: args.id || args.taskId },
    include: [
      {
        model: Board,
        where: { userId: me.id },
        required: true
      }
    ]
  })

  return !!task
})

const isTagOwner = rule()(async (_parent, { id }, { me }) => {
  const tag = await Tag.findOne({
    where: { id },
    include: [
      {
        model: Task,
        attributes: [],
        required: true,
        include: [
          {
            model: Board,
            attributes: [],
            where: { userId: me.id },
            required: true
          }
        ]
      }
    ]
  })

  return !!tag
})

const isTemplateOwner = rule()(async (_parent, { id }, { me }) => {
  const template = await Template.findOne({ where: { id, authorId: me.id } })
  return !!template
})

const permissions = shield(
  {
    Query: {
      me: isAuth,
      board: chain(isAuth, race(isAdmin, isBoardOwner)),
      userBoards: chain(isAuth, isAdmin),
      allBoards: chain(isAuth, isAdmin),
      task: chain(isAuth, race(isAdmin, isTaskOwner)),
      boardTasks: chain(isAuth, race(isAdmin, isBoardOwner)),
      userTasks: isAuth,
      template: isAuth,
      authorTemplates: isAuth,
      allTemplates: isAuth,
      user: chain(isAuth, isAdmin),
      allUsers: chain(isAuth, isAdmin),
      tag: chain(isAuth, race(isAdmin, isTagOwner)),
      tagTasks: chain(isAuth, race(isAdmin, isTagOwner)),
      taskTags: chain(isAuth, race(isAdmin, isTaskOwner))
    },
    Mutation: {
      login: not(isAuth, AuthenticatedError),
      register: not(isAuth, AuthenticatedError),
      forgotPassword: not(isAuth, AuthenticatedError),
      resetPassword: not(isAuth, AuthenticatedError),
      changePassword: isAuth,
      addBoard: isAuth,
      updateBoard: chain(isAuth, race(isAdmin, isBoardOwner)),
      deleteBoard: chain(isAuth, race(isAdmin, isBoardOwner)),
      addTask: isAuth,
      updateTask: chain(isAuth, race(isAdmin, isTaskOwner)),
      deleteTask: chain(isAuth, race(isAdmin, isTaskOwner)),
      addTemplate: isAuth,
      updateTemplate: chain(isAuth, race(isAdmin, isTemplateOwner)),
      deleteTemplate: chain(isAuth, race(isAdmin, isTemplateOwner)),
      addUser: chain(isAuth, isAdmin),
      updateUser: chain(isAuth, isAdmin),
      deleteUser: chain(isAuth, isAdmin)
    }
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
