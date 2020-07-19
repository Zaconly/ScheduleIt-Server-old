import { ExpressContext } from "apollo-server-express/dist/ApolloServer"
import { mailer } from "@monorepo/shared"
import { User } from "./types"

export interface Context {
  me?: User
  mailer: typeof mailer
  req: ExpressContext["req"]
  res: ExpressContext["res"]
}
