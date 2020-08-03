import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript"
import shortid from "shortid"

import Board from "./Board"
import User from "./User"

@Table
class Template extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 2, max: 30 })
  @Unique
  @AllowNull(false)
  @Column
  name!: string

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User)
  author!: User

  @HasMany(() => Board)
  boards!: Board[]
}

export default Template
