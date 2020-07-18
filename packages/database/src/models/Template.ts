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
class Template extends Model<Template> {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 2, max: 30 })
  @Unique
  @AllowNull(false)
  @Column
  name!: string

  @ForeignKey(() => User as never)
  @Column
  authorId!: string

  @BelongsTo(() => User as never)
  author!: User

  @HasMany(() => Board as never)
  boards!: Board[]
}

export default Template
