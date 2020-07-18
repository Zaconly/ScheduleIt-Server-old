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
import User from "./User"
import Template from "./Template"

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
}

export default Board
