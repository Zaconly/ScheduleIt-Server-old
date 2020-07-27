import shortid from "shortid"
import {
  Model,
  PrimaryKey,
  Default,
  Column,
  Length,
  Table,
  Unique,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull
} from "sequelize-typescript"
import User from "./User"
import Board from "./Board"

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
