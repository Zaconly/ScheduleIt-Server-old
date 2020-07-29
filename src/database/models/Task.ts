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
  BelongsToMany
} from "sequelize-typescript"
import Board from "./Board"
import TaskTag from "./TaskTag"
import Tag from "./Tag"

@Table
class Task extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 1, max: 30 })
  @AllowNull(false)
  @Column
  name!: string

  @Default(false)
  @Column
  isCompleted!: boolean

  @Column
  startDate?: Date

  @Column
  endDate?: Date

  @ForeignKey(() => Board)
  @Column
  boardId!: string

  @BelongsTo(() => Board)
  board!: Board

  @BelongsToMany(() => Tag, () => TaskTag)
  tags!: Array<Tag & { TaskTag: TaskTag }>
}

export default Task
