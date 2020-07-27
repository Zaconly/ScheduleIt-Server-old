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
  AllowNull
} from "sequelize-typescript"
import Board from "./Board"

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
}

export default Task
