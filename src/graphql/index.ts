import { RedisCache } from "apollo-server-cache-redis"
import { ApolloServer } from "apollo-server-express"
import responseCachePlugin from "apollo-server-plugin-response-cache"
import { createContext, EXPECTED_OPTIONS_KEY } from "dataloader-sequelize"
import { buildContext } from "graphql-passport"

import sequelize from "../database"
import { mailer } from "../utils"
import { Context } from "./context"
import schema from "./middlewares/permissions"
import loggerPlugin from "./plugins/logger"
import { Maybe, User } from "./types"

const { REDIS_PORT, REDIS_HOST = "localhost", NODE_ENV } = process.env

export default new ApolloServer({
  schema,
  cache: new RedisCache({
    host: REDIS_HOST,
    port: REDIS_HOST === "localhost" ? ((REDIS_PORT as unknown) as number) : undefined
  }),
  cacheControl: {
    defaultMaxAge: NODE_ENV === "production" ? 30 : 0
  },
  context: async ({ req, res }): Promise<Context> =>
    // @ts-ignore
    buildContext({
      [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
      req,
      res,
      mailer,
      me: req.user as Maybe<User>
    }),
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
