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
class Task extends Model<Task> {
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

  @ForeignKey(() => Board as never)
  @Column
  boardId!: string

  @BelongsTo(() => Board as never)
  board!: Board
}

export default Task
