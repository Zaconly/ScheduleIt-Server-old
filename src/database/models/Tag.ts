import {
  AllowNull,
  BelongsToMany,
  Column,
  Default,
  Length,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import shortid from "shortid"

import Task from "./Task"
import TaskTag from "./TaskTag"

@Table
class Tag extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 1, max: 20 })
  @AllowNull(false)
  @Column
  name!: string

  @Length({ min: 6, max: 6 })
  @Column
  color?: string

  @BelongsToMany(() => Task, () => TaskTag)
  tasks!: Task[]
}

export default Tag
