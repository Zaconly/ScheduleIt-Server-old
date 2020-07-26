import { ApolloServer } from "apollo-server-express"
import { RedisCache } from "apollo-server-cache-redis"
import responseCachePlugin from "apollo-server-plugin-response-cache"
import { buildContext } from "graphql-passport"
import schema from "./middlewares/permissions"
import { mailer } from "../utils"
import loggerPlugin from "./plugins/logger"
import { Context } from "./context"
import { Maybe, User } from "./types"

const { REDIS_PORT, REDIS_HOST = "localhost" } = process.env

export default new ApolloServer({
  schema,
  cache: new RedisCache({
    host: REDIS_HOST,
    port: REDIS_HOST === "localhost" ? ((REDIS_PORT as unknown) as number) : undefined
  }),
  cacheControl: {
    defaultMaxAge: 30
  },
  context: async ({ req, res }): Promise<Context> =>
    // @ts-ignore
    buildContext({ req, res, mailer, me: req.user as Maybe<User> }),
  plugins: [
    responseCachePlugin({
      sessionId: requestContext =>
        requestContext.request.http?.headers
          .get("cookie")
          ?.split(";")
          ?.find(c => c.trim().startsWith("sessid"))
          ?.split(/=(.+)/)[1] || null
    }),
    loggerPlugin
  ]
})
