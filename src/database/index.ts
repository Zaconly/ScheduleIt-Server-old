import { Sequelize } from "sequelize-typescript"

import {
  Board,
  Card,
  CardTag,
  CheckList,
  List,
  ResetToken,
  Tag,
  Task,
  Template,
  User
} from "./models"

const { DB_USER, DB_PWD, DB_NAME, DB_PORT, DB_HOST = "localhost" } = process.env

const sequelize = new Sequelize({
  username: DB_USER || "root",
  password: DB_PWD || "root",
  database: DB_NAME,
  port: DB_HOST === "localhost" ? ((DB_PORT as unknown) as number) || 3306 : undefined,
  host: DB_HOST,
  dialect: "mysql",
  models: [User, ResetToken, Template, Board, Tag, List, Card, CheckList, Task, CardTag]
})

export * from "./models"
export default sequelize
