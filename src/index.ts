import "dotenv/config"
import express from "express"
import server from "./middlewares/apolloServer"

const PORT = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  console.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)
