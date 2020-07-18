"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const graphql_1 = __importDefault(require("@monorepo/graphql"));
const database_1 = __importDefault(require("@monorepo/database"));
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;
const app = express_1.default();
graphql_1.default.applyMiddleware({ app });
app.use(compression_1.default());
app.use(helmet_1.default());
database_1.default.sync({ force: env === "development" }).then(() => {
    app.listen({ port: PORT }, () => console.info(`Server ready at http://localhost:${PORT}${graphql_1.default.graphqlPath}`));
});
