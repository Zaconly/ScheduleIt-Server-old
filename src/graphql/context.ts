import { Mailer } from "../utils/mail"
import { Maybe, User } from "./types"
import { PassportContext } from "graphql-passport"

interface Credentials {
  username: string
  password: string
}

export interface Context extends PassportContext<User, Credentials | User> {
  me: Maybe<User>
  mailer: Mailer
}
