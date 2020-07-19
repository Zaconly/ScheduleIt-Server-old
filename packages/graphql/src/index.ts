import { ApolloServer } from "apollo-server-express"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { mailer } from "@monorepo/shared"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"

console.info(process.env)

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }): Promise<Context> => {
    return {
      mailer,
      req,
      res
    }
  },
  plugins: [loggerPlugin]
})
