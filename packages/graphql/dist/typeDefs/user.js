"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const userSchema = apollo_server_express_1.gql `
  extend type Query {
    user(id: ID!): User
    allUsers: [User!]
  }

  extend type Mutation {
    addUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  enum Role {
    USER
    ADMIN
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    isActive: Boolean!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
exports.default = userSchema;
