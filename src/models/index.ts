import { Sequelize } from "sequelize-typescript"
import User from "./User"

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: (process.env.DB_PORT as unknown) as number,
  dialect: "mysql",
  models: [User as never]
})

export default sequelize
