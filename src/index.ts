import express from "express"
import compression from "compression"
import helmet from "helmet"
import server from "./graphql"
import sequelize from "./database"
import cronScheduler from "./cron"
import { logger } from "./utils"

const PORT = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.use(compression())
app.use(helmet())

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
