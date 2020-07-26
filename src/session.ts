import { PassportStatic } from "passport"
import { GraphQLLocalStrategy } from "graphql-passport"
import { User } from "./database/models"
import { User as UserType } from "./graphql/types"
import { CredentialsError } from "./graphql/errors"

type Callback = (err: string | Error, user: UserType | UserType["id"]) => void

export default (passport: PassportStatic) => {
  passport.use(
    new GraphQLLocalStrategy(async (identifier: string, password: string, done: Callback) => {
      const user = await User.findByIdentifier(identifier)
      let error = new CredentialsError()

      if (user) {
        const isValid = await user.validatePassword(password)

        if (isValid) error = null
      }

      done(error, user)
    })
  )

  passport.serializeUser(async (user: UserType, done: Callback) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id: UserType["id"], done: Callback) => {
    const user = await User.findByPk(id)

    done(null, user)
  })
}
