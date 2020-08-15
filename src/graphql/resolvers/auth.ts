import { ApolloError } from "apollo-server-express"
import cryto from "crypto"
import { EXPECTED_OPTIONS_KEY } from "dataloader-sequelize"
import { resolver } from "graphql-sequelize"
import { fn, Op } from "sequelize"

import { ResetToken, User } from "../../database"
import { Context } from "../context"
import { NotFoundError, ServerError, TokenError } from "../errors"
import { Resolvers } from "../types"

resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY }

const authResolver: Resolvers<Context> = {
  Query: {
    me: resolver(User, {
      before: (options, _args, { me }) => {
        options.where = { id: me.id }
        return options
      }
    })
  },
  Mutation: {
    login: async (_parent, { input: { identifier, password } }, { authenticate, login }) => {
      const { user } = await authenticate("graphql-local", { username: identifier, password })
      login(user)

      return user
    },
    register: async (_parent, { input }, { authenticate, login }) => {
      await User.create(input)

      const { user } = await authenticate("graphql-local", {
        username: input.username,
        password: input.password
      })

      login(user)

      return user
    },
    logout: async (_parent, _args, { logout }) => {
      try {
        logout()
      } catch (e) {
        throw new ServerError()
      }
    },
    forgotPassword: async (_parent, { email }, { mailer }) => {
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
              resetLink: `${process.env.CLIENT_PATH}/reset-password/${encodeURIComponent(token)}`
            }
          })
        }
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    resetPassword: async (_parent, { token: encodedToken, newPassword }) => {
      const token = decodeURIComponent(encodedToken)

      const record = await ResetToken.findOne({
        where: {
          expirationDate: { [Op.gt]: fn("CURDATE") },
          token,
          isUsed: false
        }
      })

      if (!record) {
        throw new TokenError("Reset token is invalid or expired, please request a new one.")
      }

      try {
        await ResetToken.update({ isUsed: true }, { where: { token } })

        await User.changePassword(newPassword, "email", record.email)
      } catch (e) {
        throw new ServerError(e.message)
      }
    },
    changePassword: async (_parent, { oldPassword, newPassword }, { me }) => {
      if (!me) throw new NotFoundError("User not found.")

      const user = await User.findByPk(me.id)
      if (!user) throw new NotFoundError("User not found.")

      const isValid = await user.validatePassword(oldPassword)
      if (!isValid) throw new ApolloError("Your current password is invalid.", "INVALID_PASSWORD")

      if (oldPassword === newPassword)
        throw new ApolloError(
          "New password must be different than current password.",
          "INVALID_PASSWORD"
        )

      try {
        await User.changePassword(newPassword, "id", user.id)
      } catch (e) {
        throw new ServerError(e.message)
      }
    }
  }
}

export default authResolver
