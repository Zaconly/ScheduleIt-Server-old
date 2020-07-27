import shortid from "shortid"
import {
  Model,
  PrimaryKey,
  Default,
  Column,
  Length,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  HasMany
} from "sequelize-typescript"
import User from "./User"
import Template from "./Template"
import Task from "./Task"

@Table
class Board extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 2, max: 30 })
  @AllowNull(false)
  @Column
  name!: string

  @Column
  icon?: string

  @Default(false)
  @Column
  isArchived!: boolean

  @ForeignKey(() => User)
  @Column
  userId!: string

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Template)
  @Column
  templateId!: string

  @BelongsTo(() => Template)
  template!: Template

  @HasMany(() => Task)
  tasks!: Task[]
}

export default Board
