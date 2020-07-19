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
class Board extends Model<Board> {
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

  @ForeignKey(() => User as never)
  @Column
  userId!: string

  @BelongsTo(() => User as never)
  user!: User

  @ForeignKey(() => Template as never)
  @Column
  templateId!: string

  @BelongsTo(() => Template as never)
  template!: Template

  @HasMany(() => Task as never)
  tasks!: Task[]
}

export default Board
