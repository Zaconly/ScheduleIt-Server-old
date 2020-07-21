import { User } from "./types"
import { Mailer } from "../utils/mail"
import { Request, Response } from "express"

export interface Context {
  me?: User
  mailer: Mailer
  req: Request
  res: Response
}
