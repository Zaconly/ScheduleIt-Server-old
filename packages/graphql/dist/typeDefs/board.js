"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const boardSchema = apollo_server_express_1.gql `
  extend type Query {
    board(id: ID!): Board
    userBoards: [Board!]
    allBoards: [Board!]
  }

  extend type Mutation {
    addBoard(input: BoardInput!): Board
    updateBoard(id: ID!, input: BoardInput!): Board
    deleteBoard(id: ID!): Boolean
  }

  input BoardInput {
    name: String!
    icon: String!
    isArchived: Boolean!
  }

  type Board {
    id: ID!
    name: String!
    icon: String
    isArchived: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
exports.default = boardSchema;
