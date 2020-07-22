import { ApolloServer } from "apollo-server-express"
import { RedisCache } from "apollo-server-cache-redis"
import responseCachePlugin from "apollo-server-plugin-response-cache"
import schema from "./middlewares/permissions"
import { mailer } from "../utils"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"
import { validateToken } from "../utils/token"

export default new ApolloServer({
  schema,
  cache: new RedisCache({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }),
  cacheControl: {
    defaultMaxAge: 30
  },
  context: async ({ req }): Promise<Context> => {
    const me = await validateToken(req)

    return {
      me,
      mailer,
      req
    }
  },
  plugins: [
    responseCachePlugin({
      sessionId: requestContext => requestContext.request.http?.headers.get("Authorization") || null
    }),
    loggerPlugin
  ]
})
