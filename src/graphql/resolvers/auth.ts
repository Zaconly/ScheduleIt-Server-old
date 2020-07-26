import { User, ResetToken } from "../../database/models"
import { Op, fn } from "sequelize"
import cryto from "crypto"
import { Resolvers, AuthPayload } from "../types"
import { ApolloError } from "apollo-server-express"
import { Context } from "../context"
import { ServerError, TokenError, NotFoundError } from "../errors"
import { logger } from "../../utils"

const authResolver: Resolvers<Context> = {
  Query: {},
  Mutation: {
    login: async (
      _parent,
      { input: { identifier, password } },
      { authenticate, login }
    ): Promise<AuthPayload> => {
      const { user } = await authenticate("graphql-local", { username: identifier, password })
      login(user)

      return { me: user }
    },
    register: async (_parent, { input }, { authenticate, login }): Promise<AuthPayload> => {
      await User.create(input)

      const { user } = await authenticate("graphql-local", {
        username: input.username,
        password: input.password
      })

      login(user)

      return { me: user }
    },
    logout: async (_parent, _args, { logout }): Promise<boolean> => {
      try {
        logout()

        return true
      } catch (e) {
        throw new ServerError()
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

          ResetToken.create({
            email,
            expirationDate,
            token,
            isUsed: false
          })

          mailer.sendMail({
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
        logger(e, "ERROR")
        throw new ServerError()
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
          throw new TokenError("Reset token is invalid or expired, please request a new one")
        }

        await ResetToken.update({ isUsed: true }, { where: { token } })

        await User.changePassword(newPassword, "email", record.email)

        return true
      } catch (e) {
        throw new ServerError()
      }
    },
    changePassword: async (_parent, { oldPassword, newPassword }, { me }): Promise<boolean> => {
      try {
        if (!me) throw new NotFoundError("User not found")

        const user = await User.findByPk(me.id)
        if (!user) throw new NotFoundError("User not found")

        const isValid = await user.validatePassword(oldPassword)
        if (!isValid) throw new ApolloError("Password invalid", "INVALID_PASSWORD")

        await User.changePassword(newPassword, "id", user.id)

        return true
      } catch (e) {
        logger(e, "ERROR")
        throw new ServerError("Internal Server Error")
      }
    }
  }
}

export default authResolver
