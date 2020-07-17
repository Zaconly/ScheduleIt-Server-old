import { ApolloServer } from "apollo-server-express"
import typeDefs from "../graphql/typeDefs"
import resolvers from "../graphql/resolvers"
import loggerPlugin from "../utils/logger"

export default new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggerPlugin]
})
