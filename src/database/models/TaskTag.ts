import shortid from "shortid"
import { Model, PrimaryKey, Default, Column, Table, ForeignKey } from "sequelize-typescript"
import Task from "./Task"
import Tag from "./Tag"

@Table({ timestamps: false })
class TaskTag extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @ForeignKey(() => Task)
  @Column
  taskId!: string

  @ForeignKey(() => Tag)
  @Column
  tagId!: string
}

export default TaskTag
