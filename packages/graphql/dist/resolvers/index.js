"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_iso_date_1 = require("graphql-iso-date");
const user_1 = __importDefault(require("./user"));
const scalarResolver = {
    Date: graphql_iso_date_1.GraphQLDate,
    Time: graphql_iso_date_1.GraphQLTime,
    DateTime: graphql_iso_date_1.GraphQLDateTime
};
exports.default = [scalarResolver, user_1.default];
