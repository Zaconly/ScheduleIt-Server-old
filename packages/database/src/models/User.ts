import shortid from "shortid"
import bcrypt from "bcryptjs"
import {
  Model,
  PrimaryKey,
  Default,
  Column,
  Unique,
  IsAlphanumeric,
  Length,
  IsEmail,
  Table,
  HasMany,
  AllowNull,
  BeforeCreate
} from "sequelize-typescript"
import Template from "./Template"
import Board from "./Board"
import { Role } from "../types"

@Table
class User extends Model<User> {
  @PrimaryKey
  @Default(() => shortid.generate())
  @Column
  id!: string

  @Unique
  @IsAlphanumeric
  @AllowNull(false)
  @Length({ min: 3, max: 30 })
  @Column
  username!: string

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email!: string

  @Length({ min: 4, max: 60 })
  @AllowNull(false)
  @Column
  password!: string

  @Default(Role.User)
  @AllowNull(false)
  @Column
  role!: Role

  @Default(false)
  @AllowNull(false)
  @Column
  isActive!: boolean

  @HasMany(() => Template as never)
  templates!: Template[]

  @HasMany(() => Board as never)
  boards!: Board[]

  @BeforeCreate
  static async setPassword(user: User): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10)
  }

  static async findByIdentifier(identifier: string): Promise<User | null> {
    let user = await User.findOne({
      where: { username: identifier }
    })

    if (!user) {
      user = await User.findOne({
        where: { email: identifier }
      })
    }

    return user
  }

  static async changePassword(password: string, field: string, identifier: string): Promise<void> {
    const newPassword = await bcrypt.hash(password, 10)
    await User.update({ password: newPassword }, { where: { [field]: identifier } })
  }

  async validatePassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password)
    return match
  }
}

export default User
