import express from "express"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import passport from "passport"
import session from "express-session"
import store from "connect-redis"
import { v4 as uuid } from "uuid"
import server from "./graphql"
import initialiseSession from "./session"
import sequelize from "./database"
import redisClient from "./database/redis"
import cronScheduler from "./cron"
import { logger } from "./utils"

const PORT = process.env.PORT || 4000
const RedisStore = store(session)

initialiseSession(passport)

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["POST"],
    credentials: true
  })
)
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

server.applyMiddleware({ app })

sequelize
  .sync({ force: false })
  .then(() => {
    logger(`Sequelize: Connected to database '${process.env.DB_NAME}'`)
    app.listen({ port: PORT }, () => {
      logger(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      cronScheduler()
    })
  })
  .catch(err => logger(err, "ERROR"))
