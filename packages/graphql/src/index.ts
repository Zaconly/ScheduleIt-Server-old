import { ApolloServer } from "apollo-server-express"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import loggerPlugin from "./plugins/logger"

export default new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggerPlugin]
})
