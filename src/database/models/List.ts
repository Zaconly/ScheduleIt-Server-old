import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import shortid from "shortid"

import Board from "./Board"
import Card from "./Card"

@Table
class List extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 1, max: 30 })
  @AllowNull(false)
  @Column
  name!: string

  @Column({ type: DataType.SMALLINT })
  order!: number

  @ForeignKey(() => Board)
  @Column
  boardId!: string

  @BelongsTo(() => Board)
  board!: Board

  @HasMany(() => Card)
  cards!: Card[]
}

export default List
