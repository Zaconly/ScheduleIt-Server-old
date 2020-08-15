import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript"
import shortid from "shortid"

import Board from "./Board"
import Card from "./Card"
import CardTag from "./CardTag"

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

  @ForeignKey(() => Board)
  @Column
  boardId!: string

  @BelongsTo(() => Board)
  board!: Board

  @BelongsToMany(() => Card, () => CardTag)
  cards!: Card[]
}

export default Tag
