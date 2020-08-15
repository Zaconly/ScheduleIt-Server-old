import { Column, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import shortid from "shortid"

import Card from "./Card"
import Tag from "./Tag"

@Table({ timestamps: false })
class CardTag extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @ForeignKey(() => Card)
  @Column
  cardId!: string

  @ForeignKey(() => Tag)
  @Column
  tagId!: string
}

export default CardTag
