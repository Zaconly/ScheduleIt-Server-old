import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import shortid from "shortid"

import List from "./List"
import Task from "./Task"
import Template from "./Template"
import User from "./User"

@Table
class Board extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 1, max: 30 })
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

  @Column({ type: DataType.SMALLINT })
  order!: number

  @ForeignKey(() => Template)
  @Column
  templateId!: string

  @BelongsTo(() => Template)
  template!: Template

  @HasMany(() => List)
  lists!: List[]

  @HasMany(() => Task)
  tasks!: Task[]
}

export default Board
