import { Column, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import shortid from "shortid"

import Tag from "./Tag"
import Task from "./Task"

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
