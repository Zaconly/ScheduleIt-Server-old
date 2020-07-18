"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = __importDefault(require("./user"));
const linkSchema = apollo_server_express_1.gql `
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
`;
exports.default = [linkSchema, user_1.default];
