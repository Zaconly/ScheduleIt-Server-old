import { ApolloServer } from "apollo-server-express"
import { RedisCache } from "apollo-server-cache-redis"
import responseCachePlugin from "apollo-server-plugin-response-cache"
import schema from "./middlewares/permissions"
import { mailer } from "../utils"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"
import { validateToken } from "../utils/token"

const { REDIS_PORT, REDIS_HOST = "localhost" } = process.env

export default new ApolloServer({
  schema,
  cache: new RedisCache({
    host: REDIS_HOST,
    port: REDIS_HOST === "localhost" ? REDIS_PORT : undefined
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
