import shortid from "shortid"
import { Model, PrimaryKey, Default, Column, Table, IsEmail } from "sequelize-typescript"

@Table
class ResetToken extends Model<ResetToken> {
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
