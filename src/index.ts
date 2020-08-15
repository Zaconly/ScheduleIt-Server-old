import compression from "compression"
import store from "connect-redis"
import cors from "cors"
import express from "express"
import session from "express-session"
import helmet from "helmet"
import passport from "passport"
import { v4 as uuid } from "uuid"

import cronScheduler from "./cron"
import sequelize from "./database"
import redisClient from "./database/redis"
import server from "./graphql"
import initialiseSession from "./session"
import { logger } from "./utils"

const PORT = process.env.PORT || 4000
const RedisStore = store(session)
const corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3000"],
  credentials: true
}

initialiseSession(passport)

const app = express()

app.use(cors(corsOptions))
app.use(compression())
app.use(helmet())

app.use(
  session({
    name: "sessid",
    genid: () => uuid(),
    secret: process.env.SESSION_SECRET as string,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 3600000 // 1 hour
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

server.applyMiddleware({ app, cors: corsOptions })

sequelize
  .sync({ force: false })
  .then(() => {
    logger.info(`Sequelize: Connected to database '${process.env.DB_NAME}'`)
    app.listen({ port: PORT }, () => {
      logger.info(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      cronScheduler()
    })
  })
  .catch(err => logger.error(err))
