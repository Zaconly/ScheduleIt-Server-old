import { ApolloServer } from "apollo-server-express"
import schema from "./middlewares/permissions"
import { mailer } from "../utils"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"

export default new ApolloServer({
  schema,
  context: async ({ req, res }): Promise<Context> => {
    return {
      mailer,
      req,
      res
    }
  },
  plugins: [loggerPlugin]
})
