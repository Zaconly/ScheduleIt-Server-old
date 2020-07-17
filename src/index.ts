import "dotenv/config"
import express from "express"
import server from "./middlewares/apolloServer"
import compression from "compression"
import helmet from "helmet"
import sequelize from "./models"

const isDev = process.env.NODE_ENV !== "production"
const PORT = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.use(compression())
app.use(helmet())

sequelize.sync({ force: isDev }).then(() => {
  app.listen({ port: PORT }, () =>
    console.info(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  )
})
