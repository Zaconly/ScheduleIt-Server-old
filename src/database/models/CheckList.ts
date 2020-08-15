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

import Card from "./Card"
import Task from "./Task"

@Table
class CheckList extends Model {
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

  @ForeignKey(() => Card)
  @Column
  cardId!: string

  @BelongsTo(() => Card)
  card!: Card

  @HasMany(() => Task)
  tasks!: Task[]
}

export default CheckList
