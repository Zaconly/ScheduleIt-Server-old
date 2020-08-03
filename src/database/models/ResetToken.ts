import { Column, Default, IsEmail, Model, PrimaryKey, Table } from "sequelize-typescript"
import shortid from "shortid"

@Table
class ResetToken extends Model {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @IsEmail
  @Column
  email!: string

  @Column
  token!: string

  @Column
  expirationDate!: Date

  @Default(false)
  @Column
  isUsed!: boolean
}

export default ResetToken
