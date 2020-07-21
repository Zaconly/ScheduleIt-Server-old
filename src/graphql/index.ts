import { ApolloServer } from "apollo-server-express"
import schema from "./middlewares/permissions"
import { mailer } from "../utils"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"
import { validateToken } from "../utils/token"

export default new ApolloServer({
  schema,
  context: async ({ req, res }): Promise<Context> => {
    const me = await validateToken(req)

    return {
      me,
      mailer,
      req,
      res
    }
  },
  plugins: [loggerPlugin]
})
