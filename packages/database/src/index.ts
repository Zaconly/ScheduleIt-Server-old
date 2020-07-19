import { Sequelize } from "sequelize-typescript"
import config from "./config/config.json"
import { User, Template, Board, Task, ResetToken } from "./models"
import { Config } from "./types"
import { Dialect } from "sequelize/types"

const conf: { [index: string]: Config } = config
const env = process.env.NODE_ENV || "development"

// @ts-ignore
const sequelize = new Sequelize({
  ...conf[env],
  port: conf[env].port || 3306,
  dialect: (conf[env].dialect as Dialect) || "mysql",
  models: [User, ResetToken, Template, Board, Task]
})

export * from "./models"

export default sequelize
