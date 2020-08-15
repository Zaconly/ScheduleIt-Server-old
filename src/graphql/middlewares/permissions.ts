import { ApolloError, ForbiddenError, makeExecutableSchema } from "apollo-server-express"
import { applyMiddleware } from "graphql-middleware"
import { chain, not, race, rule, shield } from "graphql-shield"

import { Board, Card, CheckList, List, Tag, Task, Template } from "../../database"
import resolvers from "../resolvers"
import typeDefs from "../typeDefs"

const AuthenticatedError = new ApolloError("You must be logout to do this action", "AUTHENTICATED")

const isAuth = rule({ cache: "contextual" })(async (_parent, _args, { me }) => !!me)

const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { me }) => me.role === "ADMIN")

const isTemplateOwner = rule()(async (_parent, { id }, { me }) => {
  const template = await Template.findOne({ where: { id, authorId: me.id } })
  return !!template
})

const isBoardOwner = rule()(async (_parent, args, { me }) => {
  const board = await Board.findOne({ where: { id: args.id || args.boardId, userId: me.id } })
  return !!board
})

const isTagOwner = rule()(async (_parent, args, { me }) => {
  const tag = await Tag.findOne({
    where: { id: args.id || args.tagId },
    include: [
      {
        model: Board,
        attributes: [],
        where: { userId: me.id },
        required: true
      }
    ]
  })

  return !!tag
})

const isListOwner = rule()(async (_parent, args, { me }) => {
  const list = await List.findOne({
    where: { id: args.id || args.listId },
    include: [
      {
        model: Board,
        attributes: [],
        where: { userId: me.id },
        required: true
      }
    ]
  })

  return !!list
})

const isCardOwner = rule()(async (_parent, args, { me }) => {
  const card = await Card.findOne({
    where: { id: args.id || args.cardId },
    include: [
      {
        model: List,
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

  return !!card
})

const isChecklistOwner = rule()(async (_parent, args, { me }) => {
  const checklist = await CheckList.findOne({
    where: { id: args.id || args.checklistId },
    include: [
      {
        model: Card,
        attributes: [],
        required: true,
        include: [
          {
            model: List,
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
      }
    ]
  })

  return !!checklist
})

const isTaskOwner = rule()(async (_parent, args, { me }) => {
  let task = await Task.findOne({
    where: { id: args.id || args.taskId },
    include: [
      {
        model: Board,
        where: { userId: me.id },
        attributes: [],
        required: true
      }
    ]
  })

  if (!task) {
    task = await Task.findOne({
      where: { id: args.id || args.taskId },
      include: [
        {
          model: CheckList,
          attributes: [],
          required: true,
          include: [
            {
              model: Card,
              attributes: [],
              required: true,
              include: [
                {
                  model: List,
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
            }
          ]
        }
      ]
    })
  }

  return !!task
})

const permissions = shield(
  {
    Query: {
      me: isAuth,
      user: chain(isAuth, isAdmin),
      users: chain(isAuth, isAdmin),

      template: isAuth,
      templates: isAuth,
      templatesAuthor: isAuth,

      board: chain(isAuth, race(isAdmin, isBoardOwner)),
      boards: chain(isAuth, isAdmin),
      boardsUser: chain(isAuth, isAdmin),
      boardsMe: isAuth,

      tag: chain(isAuth, race(isAdmin, isTagOwner)),
      tags: chain(isAuth, isAdmin),
      tagsCard: chain(isAuth, race(isAdmin, isCardOwner)),
      tagsBoard: chain(isAuth, race(isAdmin, isBoardOwner)),

      list: chain(isAuth, race(isAdmin, isListOwner)),
      lists: chain(isAuth, isAdmin),
      listsBoard: chain(isAuth, race(isAdmin, isBoardOwner)),

      card: chain(isAuth, race(isAdmin, isCardOwner)),
      cards: chain(isAuth, isAdmin),
      cardsTag: chain(isAuth, race(isAdmin, isTagOwner)),
      cardsList: chain(isAuth, race(isAdmin, isListOwner)),

      checkList: chain(isAuth, race(isAdmin, isChecklistOwner)),
      checkLists: chain(isAuth, isAdmin),
      checkListsCard: chain(isAuth, race(isAdmin, isCardOwner)),

      task: chain(isAuth, race(isAdmin, isTaskOwner)),
      tasks: chain(isAuth, isAdmin),
      tasksCheckList: chain(isAuth, race(isAdmin, isChecklistOwner)),
      tasksBoard: chain(isAuth, race(isAdmin, isBoardOwner))
    },
    Mutation: {
      login: not(isAuth, AuthenticatedError),
      logout: isAuth,
      register: not(isAuth, AuthenticatedError),
      forgotPassword: not(isAuth, AuthenticatedError),
      resetPassword: not(isAuth, AuthenticatedError),
      changePassword: isAuth,

      addUser: chain(isAuth, isAdmin),
      updateUser: chain(isAuth, isAdmin),
      deleteUser: chain(isAuth, isAdmin),

      addTemplate: isAuth,
      updateTemplate: chain(isAuth, race(isAdmin, isTemplateOwner)),
      deleteTemplate: chain(isAuth, race(isAdmin, isTemplateOwner)),

      addBoard: isAuth,
      updateBoard: chain(isAuth, race(isAdmin, isBoardOwner)),
      deleteBoard: chain(isAuth, race(isAdmin, isBoardOwner)),

      addTag: chain(isAuth, race(isAdmin, isBoardOwner)),
      updateTag: chain(isAuth, race(isAdmin, isTagOwner)),
      deleteTag: chain(isAuth, race(isAdmin, isTagOwner)),

      addList: chain(isAuth, race(isAdmin, isBoardOwner)),
      updateList: chain(isAuth, race(isAdmin, isListOwner)),
      deleteList: chain(isAuth, race(isAdmin, isListOwner)),

      addCard: chain(isAuth, race(isAdmin, isListOwner)),
      attachTag: chain(isAuth, race(isAdmin, isCardOwner)),
      detachTag: chain(isAuth, race(isAdmin, isCardOwner)),
      updateCard: chain(isAuth, race(isAdmin, isCardOwner)),
      deleteCard: chain(isAuth, race(isAdmin, isCardOwner)),

      addCheckList: chain(isAuth, race(isAdmin, isCardOwner)),
      updateCheckList: chain(isAuth, race(isAdmin, isChecklistOwner)),
      deleteCheckList: chain(isAuth, race(isAdmin, isChecklistOwner)),

      addTaskBoard: chain(isAuth, race(isAdmin, isBoardOwner)),
      addTaskCheckList: chain(isAuth, race(isAdmin, isChecklistOwner)),
      updateTask: chain(isAuth, race(isAdmin, isTaskOwner)),
      deleteTask: chain(isAuth, race(isAdmin, isTaskOwner))
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
