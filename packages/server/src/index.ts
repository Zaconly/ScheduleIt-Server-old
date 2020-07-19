import "dotenv/config"
import express from "express"
import compression from "compression"
import helmet from "helmet"
import server from "@monorepo/graphql"
import sequelize from "@monorepo/database"
import cronScheduler from "./cron"

const PORT = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.use(compression())
app.use(helmet())

sequelize.sync({ force: false }).then(() => {
  app.listen({ port: PORT }, () => {
    console.info(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    cronScheduler()
  })
})
