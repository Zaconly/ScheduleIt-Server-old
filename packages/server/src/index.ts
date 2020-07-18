import "dotenv/config"
import express from "express"
import compression from "compression"
import helmet from "helmet"
import server from "@monorepo/graphql"
import sequelize from "@monorepo/database"

const env = process.env.NODE_ENV || "development"
const PORT = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.use(compression())
app.use(helmet())

sequelize.sync({ force: env === "development" }).then(() => {
  app.listen({ port: PORT }, () =>
    console.info(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  )
})
