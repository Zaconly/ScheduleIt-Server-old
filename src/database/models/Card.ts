import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
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
import CardTag from "./CardTag"
import CheckList from "./CheckList"
import List from "./List"
import Tag from "./Tag"

@Table
class Card extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Length({ min: 1, max: 30 })
  @AllowNull(false)
  @Column
  name!: string

  @Column
  dueDate?: Date

  @Column({ type: DataType.TEXT })
  desc?: string

  @Column({ type: DataType.SMALLINT })
  order!: number

  @ForeignKey(() => List)
  @Column
  listId!: string

  @BelongsTo(() => List)
  list!: Board

  @HasMany(() => CheckList)
  checkLists!: CheckList[]

  @BelongsToMany(() => Tag, () => CardTag)
  tags!: Array<Tag & { CardTag: CardTag }>
}

export default Card
