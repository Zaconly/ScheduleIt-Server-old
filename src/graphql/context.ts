import { Response } from "express"
import { PassportContext } from "graphql-passport"

import { Mailer } from "../utils/mail"
import { Maybe, User } from "./types"

interface Credentials {
  username: string
  password: string
}

export interface Context extends PassportContext<User, Credentials | User> {
  me: Maybe<User>
  mailer: Mailer
  res: Response
}
