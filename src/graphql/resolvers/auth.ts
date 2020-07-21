import { User, ResetToken } from "../../database/models"
import { Op, fn } from "sequelize"
import cryto from "crypto"
import { Resolvers, AuthPayload } from "../types"
import { ApolloError } from "apollo-server-express"
import { Context } from "../context"
import { generateTokens } from "../../utils/token"

const authResolver: Resolvers<Context> = {
  Query: {},
  Mutation: {
    login: async (_parent, { input: { identifier, password } }): Promise<AuthPayload> => {
      const user = await User.findByIdentifier(identifier)
      if (!user) throw new ApolloError("Wrong credentials", "WRONG_CREDENTIALS")

      const isValid = await user.validatePassword(password)
      if (!isValid) throw new ApolloError("Wrong credentials", "WRONG_CREDENTIALS")

      const { accessToken, refreshToken, expiryDate } = await generateTokens(user)

      return {
        me: user,
        token: accessToken,
        expiryDate,
        refreshToken
      }
    },
    register: async (_parent, { input }): Promise<AuthPayload> => {
      const newUser = await User.create(input)

      const { accessToken, refreshToken, expiryDate } = await generateTokens(newUser)

      return {
        me: newUser,
        token: accessToken,
        expiryDate,
        refreshToken
      }
    },
    forgotPassword: async (_parent, { email }, { mailer }): Promise<boolean> => {
      try {
        const user = await User.findOne({ where: { email } })

        if (user) {
          await ResetToken.update({ isUsed: true }, { where: { email } })

          const token = cryto.randomBytes(32).toString("base64")

          const expirationDate = new Date()
          expirationDate.setDate(expirationDate.getDate() + 1 / 24)

          await ResetToken.create({
            email,
            expirationDate,
            token,
            isUsed: false
          })

          await mailer.sendMail({
            from: mailer.constants.sender,
            to: email,
            subject: mailer.constants.forgotPassword.title,
            template: mailer.constants.forgotPassword.template,
            context: {
              username: user.username,
              resetLink: `${process.env.CLIENT_PATH}/forgot-password/${encodeURIComponent(token)}`
            }
          })
        }

        return true
      } catch (e) {
        console.info(e)
        throw new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR")
      }
    },
    resetPassword: async (_parent, { token: encodedToken, newPassword }): Promise<boolean> => {
      try {
        const token = decodeURIComponent(encodedToken)

        const record = await ResetToken.findOne({
          where: {
            expirationDate: { [Op.gt]: fn("CURDATE") },
            token,
            isUsed: false
          }
        })

        if (!record) {
          throw new ApolloError(
            "Reset token is invalid or expired, please request a new one",
            "INVALID_TOKEN"
          )
        }

        await ResetToken.update({ isUsed: true }, { where: { token } })

        await User.changePassword(newPassword, "email", record.email)

        return true
      } catch (e) {
        throw new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR")
      }
    },
    changePassword: async (_parent, { oldPassword, newPassword }, { me }): Promise<boolean> => {
      try {
        if (!me) throw new ApolloError("User not found", "NOT_FOUND")

        const user = await User.findByPk(me.id)
        if (!user) throw new ApolloError("User not found", "NOT_FOUND")

        const isValid = await user.validatePassword(oldPassword)
        if (!isValid) throw new ApolloError("Password invalid", "INVALID_PASSWORD")

        await User.changePassword(newPassword, "id", user.id)

        return true
      } catch (e) {
        throw new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR")
      }
    }
  }
}

export default authResolver
