import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import shortid from "shortid"

import Board from "./Board"
import Tag from "./Tag"
import TaskTag from "./TaskTag"

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
